import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';

import { AuthController } from './admin/admin-auth.controller';
import { AuthService } from './admin/admin-auth.service';
import { JwtService } from './jwt.service';
import { UserMobileAuthController } from './userMobile/userMobile-auth.controller';
import { UserMobileAuthService } from './userMobile/userMobile-auth.service';
import { UserTabletAuthController } from './userTablet/userTablet-auth.controller';
import { UserTabletAuthService } from './userTablet/userTablet-auth.service';

@Module({
  imports: [PassportModule],
  controllers: [
    AuthController,
    UserTabletAuthController,
    UserMobileAuthController,
  ],
  providers: [
    AuthService,
    JwtService,
    UserTabletAuthService,
    UserMobileAuthService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [JwtService],
})
export class AuthModule {}
