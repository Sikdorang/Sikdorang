import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const GetMenusByCategorySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카테고리별 메뉴 목록 조회' }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: '조회할 카테고리의 ID',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '메뉴 목록 조회 성공',
      schema: {
        example: [
          {
            id: 1,
            name: '돼지불백',
            price: 8000,
            description: '매콤한 돼지고기 불백',
            imageUrl: 'https://example.com/image.jpg',
            categoryId: 1,
          },
          {
            id: 2,
            name: '제육덮밥',
            price: 7500,
            description: '간장 베이스 제육덮밥',
            imageUrl: null,
            categoryId: 1,
          },
        ],
      },
    }),
    ApiResponse({
      status: 404,
      description: '해당 카테고리가 존재하지 않음',
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
    }),
  );
