import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateCategorySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카테고리 생성' }),
    ApiResponse({
      status: 201,
      description: '카테고리 생성 성공',
      schema: {
        example: {
          message: '카테고리 생성 성공',
          name: '한식',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '카테고리 생성 중 오류 발생',
      schema: {
        example: {
          message: '카테고리 생성 중 오류 발생',
        },
      },
    }),
  );
