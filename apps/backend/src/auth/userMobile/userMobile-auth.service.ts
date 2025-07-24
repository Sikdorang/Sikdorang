import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { JwtService } from '../jwt.service';

@Injectable()
export class UserMobileAuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async getMobileToken(uuid: string): Promise<string> {
    try {
      const table = await this.prisma.storeTable.findFirst({
        where: { tableToken: uuid },
      });

      if (!table) {
        throw new Error('Invalid UUID table not found');
      }

      const payload = {
        tableNumber: table.tableNumber,
        storeId: table.storeId,
      };

      const jwtAccessToken = this.jwtService.sign(payload, '2h'); // '2h' = expiresIn

      return jwtAccessToken;
    } catch (error) {
      throw error;
    }
  }
}
