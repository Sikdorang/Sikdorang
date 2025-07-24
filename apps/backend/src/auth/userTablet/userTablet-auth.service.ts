import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { JwtService } from '../jwt.service';

@Injectable()
export class UserTabletAuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPin(pinNumber: string) {
    try {
      const store = await this.prisma.store.findFirst({
        where: { pinNumber },
      });

      if (!store) {
        throw new UnauthorizedException('잘못된 핀번호입니다.');
      }
      const payload = { storeId: store.id };
      const jwtAccessToken = this.jwtService.sign(payload, '1y');
      return jwtAccessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
