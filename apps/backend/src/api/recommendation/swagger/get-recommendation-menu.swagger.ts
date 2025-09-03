import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationMenuSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 타입별 메뉴 조회',
      description: '추천 타입 ID에 해당하는 등록된 추천 메뉴를 조회합니다.',
    }),
    ApiParam({
      name: 'recommendationTypeId',
      required: true,
      description: '추천 타입 ID',
      schema: { type: 'integer', example: 1 },
    }),
    ApiResponse({
      status: 200,
      description: '추천 메뉴 조회 성공',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            menuId: { type: 'integer', example: 23 },
            recommendationTypeId: { type: 'integer', example: 1 },
            storeId: { type: 'integer', example: 10 },
            menu: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 23 },
                menu: { type: 'string', example: '화이트 와인' },
                price: { type: 'integer', example: 10000 },
              },
            },
          },
        },
      },
    }),
  );
}
