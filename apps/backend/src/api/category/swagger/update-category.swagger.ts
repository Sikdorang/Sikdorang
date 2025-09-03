import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const UpdateCategorySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카테고리 수정' }),
    ApiBody({
      description: '수정할 카테고리 정보 배열',
      isArray: true,
      schema: {
        example: [
          {
            categoryId: 1,
            category: '추천 메뉴',
            order: '1',
          },
          {
            categoryId: 2,
            category: '식사류',
            order: '2',
          },
        ],
      },
    }),
    ApiResponse({
      status: 200,
      description: '카테고리 수정 성공',
      schema: {
        example: {
          id: 1,
          name: '디저트',
          storeId: 3,
          createdAt: '2024-07-24T12:00:00.000Z',
          updatedAt: '2024-07-24T12:10:00.000Z',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '카테고리 수정 중 오류 발생',
      schema: {
        example: {
          message: '카테고리 수정 중 오류 발생',
        },
      },
    }),
  );
