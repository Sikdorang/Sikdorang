import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import { JwtService } from './jwt.service';

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
    const accessToken: string = await this.getKakaoAccessToken(code);
    const kakaoUser: KakaoUser = await this.getKakaoUserInfo(accessToken);
    let user: any = await this.findByKakaoId(kakaoUser.id);
    if (!user) {
      user = await this.createUser(kakaoUser);
    }
    // JWT 토큰 생성
    const payload = { userId: user.id, kakaoId: user.kakaoId.toString() };
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
  }

  async createUser(kakaoUser: KakaoUser): Promise<any> {
    return this.prisma.user.create({
      data: {
        kakaoId: Number(kakaoUser.id),
        nickname: kakaoUser.nickname,
      },
    });
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
    return this.prisma.user.findUnique({ where: { kakaoId: Number(kakaoId) } });
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = this.jwtService.verify(refreshToken);
    const { userId, kakaoId } = payload as { userId: number; kakaoId: number };
    return this.jwtService.sign({ userId, kakaoId }, '1h');
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }
}
