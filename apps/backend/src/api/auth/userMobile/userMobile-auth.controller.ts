import { Body, Controller, Post } from '@nestjs/common';

import { GetMobileTokenDto } from './dto/mobile-token.dto';
import { GetMobileTokenSwagger } from './swagger/get-mobile-token.swagger';
import { UserMobileAuthService } from './userMobile-auth.service';
@Controller('user-mobile-auth')
export class UserMobileAuthController {
  constructor(private readonly userMobileAuthService: UserMobileAuthService) {}

  @Post()
  @GetMobileTokenSwagger()
  async getMobileToken(@Body() dto: GetMobileTokenDto) {
    const mobileToken = await this.userMobileAuthService.getMobileToken(
      dto.tableToken,
    );
    return { mobileToken };
  }
}
