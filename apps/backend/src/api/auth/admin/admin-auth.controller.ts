import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './admin-auth.service';
import { KakaoRedirectSwagger } from './swagger/kakao-redirect.swagger';
import { LogoutSwagger } from './swagger/logout.swagger';
import { RefreshAccessTokenSwagger } from './swagger/refresh-access-token.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/redirect')
  @KakaoRedirectSwagger()
  async kakaoRedirect(@Query('code') code: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.kakaoLogin({
      code,
    });

    res.cookie('admin-authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 배포 시엔 반드시 true
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1시간
    });

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1년
    });

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  }

  @Post('refresh')
  @RefreshAccessTokenSwagger()
  async refresh(@Req() req: Request) {
    const refreshToken: string = req.cookies?.['refresh-token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const newAccessToken = await this.authService.refreshAccessToken({
        refreshToken,
      });
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post('logout')
  @LogoutSwagger()
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken: string = req.cookies?.['refresh-token'];

    if (refreshToken) {
      await this.authService.logout({ refreshToken });
    }

    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('refreshToken', { httpOnly: true });

    return res.status(200).json({ message: 'Logged out successfully' });
  }
}
