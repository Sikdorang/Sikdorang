import { Controller, Get, Param } from '@nestjs/common';

import { GetMobileTokenSwagger } from './swagger/get-mobile-token.swagger';
import { UserMobileAuthService } from './userMobile-auth.service';
@Controller('user-mobile-auth')
export class UserMobileAuthController {
  constructor(private readonly userMobileAuthService: UserMobileAuthService) {}

  @Get(':uuid')
  @GetMobileTokenSwagger()
  async getMobileToken(@Param('uuid') uuid: string) {
    const mobileToken = await this.userMobileAuthService.getMobileToken(uuid);
    return { mobileToken };
  }
}
