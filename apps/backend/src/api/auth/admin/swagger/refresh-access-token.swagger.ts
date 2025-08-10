import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const RefreshAccessTokenSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Access Token 갱신' }),
    ApiCookieAuth('refreshToken'),
    ApiResponse({
      status: 200,
      description: '토큰 갱신 성공',
      schema: {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Refresh Token 만료 또는 유효하지 않음',
      schema: {
        example: {
          message: 'Refresh token이 만료되었습니다.',
        },
      },
    }),
  );
