// src/auth/docs/auth-swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const LogoutSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '로그아웃' }),
    ApiCookieAuth('refreshToken'), // 쿠키 기반 인증 표시
    ApiResponse({
      status: 200,
      description: '로그아웃 성공',
      schema: {
        example: {
          message: '로그아웃 되었습니다.',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Refresh Token 누락 또는 유효하지 않음',
      schema: {
        example: {
          message: 'refreshToken이 없습니다.',
        },
      },
    }),
  );
