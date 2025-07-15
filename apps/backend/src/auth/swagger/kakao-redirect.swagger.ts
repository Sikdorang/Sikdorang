// src/auth/docs/auth-swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const KakaoRedirectSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카카오 로그인 Redirect 처리' }),
    ApiQuery({
      name: 'code',
      required: true,
      description: '카카오 OAuth 인가 코드',
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      schema: {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: '1',
            kakaoId: '123456789',
            nickname: '홍길동',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '인가 코드가 잘못되었거나 카카오 API 오류',
      schema: {
        example: {
          message: 'Kakao access token 요청 실패',
        },
      },
    }),
  );
