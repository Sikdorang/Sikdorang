import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import { JwtService } from '../jwt.service';

interface KakaoUser {
  id: number;
  email?: string;
  nickname?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
  ) {}

  async kakaoLogin(code: string): Promise<any> {
    try {
      const accessToken: string = await this.getKakaoAccessToken(code);
      const kakaoUser: KakaoUser = await this.getKakaoUserInfo(accessToken);
      let user: any = await this.findByKakaoId(kakaoUser.id);
      if (!user) {
        user = await this.createUser(kakaoUser);
      }
      const store = await this.prisma.store.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });

      const storeId = store?.id;

      // JWT 토큰 생성
      const payload = {
        userId: user.id,
        kakaoId: user.kakaoId.toString(),
        storeId: storeId,
      };
      const jwtAccessToken = this.jwtService.sign(payload, '1h');
      const jwtRefreshToken = this.jwtService.sign(payload, '1y');

      await this.prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: jwtRefreshToken,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1년 후
        },
      });

      return {
        user: {
          ...user,
          id: user.id.toString(),
          kakaoId: user.kakaoId.toString(),
        },
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      };
    } catch (e) {
      console.error('kakaoLogin 에러:', e);
      throw new InternalServerErrorException(
        '카카오 로그인 중 오류가 발생했습니다.',
      );
    }
  }

  async createUser(kakaoUser: KakaoUser): Promise<any> {
    let user;
    let store;
    try {
      user = await this.prisma.user.create({
        data: {
          kakaoId: Number(kakaoUser.id),
          nickname: kakaoUser.nickname,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        // Prisma unique constraint violation
        throw new ConflictException('이미 가입된 카카오 계정입니다.');
      }
      console.error('User 생성 중 에러:', e);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }

    try {
      const randomStoreName = `매장-${Math.floor(Math.random() * 100000)}`;
      const randomPinNumber = String(Math.floor(Math.random() * 100000));
      store = await this.prisma.store.create({
        data: {
          store: randomStoreName,
          userId: user.id,
          pinNumber: randomPinNumber,
        },
      });
    } catch (e) {
      console.error('Store 생성 중 에러:', e);
    }
    return { ...user, storeId: store?.id };
  }

  async getKakaoAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID!,
          redirect_uri: process.env.KAKAO_REDIRECT_URI!,
          code,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Kakao access token 요청 실패:', error);
      throw new Error('Kakao access token 요청 실패');
    }
  }

  async getKakaoUserInfo(accessToken: string): Promise<KakaoUser> {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        id: response.data.id,
        nickname: response.data.properties?.nickname ?? null,
      };
    } catch (error) {
      throw new UnauthorizedException('카카오 사용자 정보 조회 실패');
    }
  }

  async findByKakaoId(kakaoId: number): Promise<any> {
    try {
      return await this.prisma.user.findUnique({
        where: { kakaoId: Number(kakaoId) },
      });
    } catch (e) {
      console.error('findByKakaoId 에러:', e);
      throw new InternalServerErrorException(
        '사용자 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      console.log(payload);
      const { userId, kakaoId, storeId } = payload as {
        userId: number;
        kakaoId: number;
        storeId: number;
      };
      return this.jwtService.sign({ userId, kakaoId, storeId }, '1h');
    } catch (e) {
      console.error('refreshAccessToken 에러:', e);
      throw new InternalServerErrorException(
        'AccessToken 갱신 중 오류가 발생했습니다.',
      );
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    } catch (e) {
      console.error('logout 에러:', e);
      throw new InternalServerErrorException(
        '로그아웃 중 오류가 발생했습니다.',
      );
    }
  }
}
