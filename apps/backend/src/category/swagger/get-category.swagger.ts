import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetCategorySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카테고리 전체 조회' }),
    ApiResponse({
      status: 200,
      description: '카테고리 전체 조회 성공',
      schema: {
        example: [
          {
            id: 1,
            category: '한식',
            storeId: 3,
            order: 1,
            createdAt: '2024-07-23T12:34:56.789Z',
          },
          {
            id: 2,
            category: '중식',
            storeId: 3,
            order: 2,
            createdAt: '2024-07-23T12:35:12.456Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 500,
      description: '카테고리 조회 중 오류 발생',
      schema: {
        example: {
          message: '카테고리 조회 중 오류 발생',
        },
      },
    }),
  );
