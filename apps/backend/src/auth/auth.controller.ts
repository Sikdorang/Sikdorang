
import {
  Controller,
  Get,
  Post,
  Query, Req, Res, UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { KakaoRedirectSwagger } from './swagger/kakao-redirect.swagger';
import { LogoutSwagger } from './swagger/logout.swagger';
import { RefreshAccessTokenSwagger } from './swagger/refresh-access-token.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/redirect')
  @KakaoRedirectSwagger()
  async kakaoRedirect(@Query('code') code: string) {
    return this.authService.kakaoLogin(code);
  }

  @Post('refresh')
  @RefreshAccessTokenSwagger()
  async refresh(@Req() req: Request) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token not found');
  }

  try {
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);
    return { accessToken: newAccessToken };
  } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post('logout')
  @LogoutSwagger()
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await this.authService.logout(refreshToken);
  }

  res.clearCookie('accessToken', { httpOnly: true });
  res.clearCookie('refreshToken', { httpOnly: true });

  return res.status(200).json({ message: 'Logged out successfully' });
  }
}
