import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const VerifyPinSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'PIN 번호 인증' }),
    ApiBody({
      schema: {
        example: {
          pinNumber: '123456',
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'PIN 인증 성공',
      schema: {
        example: {
          pinAccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '잘못된 PIN 번호',
      schema: {
        example: {
          message: '존재하지 않는 PIN 번호입니다.',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
      schema: {
        example: {
          message: 'PIN 인증 중 오류가 발생했습니다.',
        },
      },
    }),
  );
