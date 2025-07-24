import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const LogoutSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'PIN 로그아웃' }),
    ApiResponse({
      status: 200,
      description: '로그아웃 성공',
      schema: {
        example: {
          message: '로그아웃 되었습니다.',
        },
      },
    }),
  );
