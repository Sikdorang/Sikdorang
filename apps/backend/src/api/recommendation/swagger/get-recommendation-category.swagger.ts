import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 카테고리별 메뉴 조회',
      description:
        '매장에 설정된 추천 카테고리별로 해당 카테고리에 속한 메뉴들을 조회합니다. 카테고리별로 묶인 배열 형태로 반환됩니다.',
    }),
    ApiResponse({
      status: 200,
      description: '추천 카테고리 조회 성공 (카테고리별 메뉴 포함)',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            categoryId: { type: 'integer', example: 1 },
            category: { type: 'string', example: '추천 메뉴' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: '김치찌개' },
                  price: { type: 'integer', example: 8000 },
                  isNew: { type: 'boolean', example: true },
                  isPopular: { type: 'boolean', example: false },
                  imgUrl: {
                    type: 'string',
                    example: 'stores/1/menus/1/image.png',
                  },
                  status: { type: 'string', example: 'SALE' },
                  order: { type: 'string', example: '1' },
                },
              },
            },
          },
        },
        example: [
          {
            categoryId: 1,
            category: '추천 메뉴',
            items: [
              {
                id: 1,
                name: '김치찌개',
                price: 8000,
                isNew: true,
                isPopular: false,
                imgUrl: 'stores/1/menus/1/image.png',
                status: 'SALE',
                order: '1',
              },
              {
                id: 2,
                name: '제육볶음',
                price: 8500,
                isNew: false,
                isPopular: true,
                imgUrl: 'stores/1/menus/2/image.png',
                status: 'SALE',
                order: '2',
              },
            ],
          },
          {
            categoryId: 2,
            category: '식사류',
            items: [
              {
                id: 3,
                name: '비빔밥',
                price: 7000,
                isNew: false,
                isPopular: false,
                imgUrl: undefined,
                status: 'SALE',
                order: '1',
              },
            ],
          },
        ],
      },
    }),
  );
}
