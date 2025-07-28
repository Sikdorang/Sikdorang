import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetMobileTokenSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '테이블 토큰 기반 모바일 토큰 발급',
      description:
        'QR로 발급받은 테이블 전용 토큰을 통해, 모바일에서 사용할 수 있는 토큰을 발급합니다.',
    }),
    ApiBody({
      description: 'QR에서 발급된 테이블용 토큰',
      required: true,
      schema: {
        type: 'object',
        properties: {
          tableToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
        required: ['tableToken'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '모바일 토큰 발급 성공',
      schema: {
        example: {
          mobileToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '유효하지 않은 테이블 토큰',
      schema: {
        example: {
          message: '유효하지 않은 테이블 토큰입니다.',
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
