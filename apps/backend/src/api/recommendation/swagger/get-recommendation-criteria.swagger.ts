import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationCriteriaSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 기준(맛별 대표/중간/비추천 메뉴) 조회',
      description:
        '매장의 맛 기준에 따른 대표(good) / 중간(normal) / 비추천(bad) 메뉴를 조회합니다. 맛(taste) 쿼리 파라미터가 없으면 전체 맛을 반환합니다.',
    }),
    ApiQuery({
      name: 'taste',
      required: false,
      description:
        '맛 기준. 값이 없으면 전체 맛 기준에 대한 결과를 반환합니다.',
      schema: {
        type: 'string',
        enum: ['SWEET', 'SOUR', 'BODY', 'ALCOHOL_PERCENTAGE'],
        example: 'SWEET',
      },
    }),
    ApiResponse({
      status: 200,
      description: '추천 기준 조회 성공',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            storeId: { type: 'integer', example: 10 },
            taste: {
              type: 'string',
              enum: ['SWEET', 'SOUR', 'BODY', 'ALCOHOL_PERCENTAGE'],
              example: 'SWEET',
            },
            goodId: { type: 'integer', example: 101 },
            normalId: { type: 'integer', example: 102 },
            badId: { type: 'integer', example: 103 },
            good: {
              type: 'object',
              description: '좋음으로 설정된 메뉴 정보',
              properties: {
                id: { type: 'integer', example: 101 },
                menu: { type: 'string', example: '달콤한 와인' },
                price: { type: 'integer', example: 12000 },
              },
            },
            normal: {
              type: 'object',
              description: '중간으로 설정된 메뉴 정보',
              properties: {
                id: { type: 'integer', example: 102 },
                menu: { type: 'string', example: '화이트 와인' },
                price: { type: 'integer', example: 10000 },
              },
            },
            bad: {
              type: 'object',
              description: '비추천으로 설정된 메뉴 정보',
              properties: {
                id: { type: 'integer', example: 103 },
                menu: { type: 'string', example: '드라이 와인' },
                price: { type: 'integer', example: 9000 },
              },
            },
          },
        },
      },
    }),
  );
}
