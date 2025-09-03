import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 카테고리별 메뉴 조회',
      description:
        '매장에 설정된 추천 카테고리별로 해당 카테고리에 속한 메뉴들을 조회합니다. 카테고리 이름을 키로 하고 메뉴 배열을 값으로 하는 객체 형태로 반환됩니다.',
    }),
    ApiResponse({
      status: 200,
      description: '추천 카테고리 조회 성공 (카테고리별 메뉴 포함)',
      schema: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              menu: { type: 'string', example: '화이트 와인' },
              price: { type: 'integer', example: 12000 },
              description: { type: 'string', example: '달콤한 화이트 와인' },
            },
          },
        },
        example: {
          와인: [
            {
              id: 1,
              menu: '화이트 와인',
              price: 12000,
              description: '달콤한 화이트 와인',
            },
            {
              id: 2,
              menu: '레드 와인',
              price: 15000,
              description: '진한 레드 와인',
            },
          ],
          칵테일: [
            {
              id: 3,
              menu: '모히토',
              price: 8000,
              description: '상큼한 모히토',
            },
            {
              id: 4,
              menu: '마가리타',
              price: 9000,
              description: '클래식 마가리타',
            },
          ],
        },
      },
    }),
  );
}
