import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LogoutSwagger } from '../admin/swagger/logout.swagger';

import { VerifyPinSwagger } from './swagger/verify-pin.swagger';
import { UserTabletAuthService } from './userTablet-auth.service';

@Controller('user-tablet-auth')
export class UserTabletAuthController {
  constructor(private readonly userTabletAuthService: UserTabletAuthService) {}

  @Post('verify-pin')
  @VerifyPinSwagger()
  async verifyPin(@Body('pinNumber') pinNumber: string) {
    const pinAccessToken =
      await this.userTabletAuthService.verifyPin(pinNumber);
    return { pinAccessToken };
  }

  @Post('logout')
  @LogoutSwagger()
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('pinAccessToken');
    return { message: '로그아웃 되었습니다.' };
  }
}
