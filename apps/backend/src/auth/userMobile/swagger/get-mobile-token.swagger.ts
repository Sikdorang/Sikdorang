import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const GetMobileTokenSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '모바일 UUID로 토큰 발급' }),
    ApiParam({
      name: 'uuid',
      required: true,
      description: '모바일 기기의 UUID',
      example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
    }),
    ApiResponse({
      status: 200,
      description: '토큰 발급 성공',
      schema: {
        example: {
          mobileToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'UUID가 존재하지 않음',
      schema: {
        example: {
          message: '해당 UUID를 가진 사용자를 찾을 수 없습니다.',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
      schema: {
        example: {
          message: '모바일 토큰 발급 중 오류가 발생했습니다.',
        },
      },
    }),
  );
