import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function PutRecommendationCriteriaSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 기준 메뉴 설정/수정/삭제',
      description:
        '특정 맛 기준에 대한 좋음(good), 중간(normal), 나쁨(bad) 메뉴를 설정하거나 수정합니다. 전달된 필드만 업데이트되며, 누락된 필드는 기존 값을 유지합니다. 값이 0이면 해당 필드를 삭제(null)합니다.',
    }),
    ApiParam({
      name: 'recommendationTypeId',
      required: true,
      description: '추천 기준 ID (맛 기준)',
      schema: { type: 'integer', example: 1 },
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          goodId: {
            type: 'integer',
            example: 101,
            description: '좋음으로 설정할 메뉴 ID (선택사항, 0이면 삭제)',
          },
          normalId: {
            type: 'integer',
            example: 102,
            description: '중간으로 설정할 메뉴 ID (선택사항, 0이면 삭제)',
          },
          badId: {
            type: 'integer',
            example: 103,
            description: '나쁨으로 설정할 메뉴 ID (선택사항, 0이면 삭제)',
          },
        },
        examples: {
          '모든 필드 설정': {
            value: {
              goodId: 101,
              normalId: 102,
              badId: 103,
            },
          },
          '일부 필드만 설정': {
            value: {
              goodId: 101,
              normalId: 0, // 삭제
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '추천 기준 메뉴 설정/수정 성공',
      schema: {
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
        },
        example: {
          id: 1,
          storeId: 10,
          taste: 'SWEET',
          goodId: 101,
          normalId: 102,
          badId: 103,
        },
      },
    }),
  );
}
