import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function PutRecommendationCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 카테고리 목록 갱신',
      description:
        '해당 매장의 추천 카테고리 목록을 갱신합니다.\n\n' +
        '- 존재하지 않는 categoryId는 무시됩니다.\n' +
        '- 새로 추가되거나, 기존에 존재하지만 누락된 항목은 삭제됩니다.',
    }),
    ApiBody({
      description: '추천 카테고리 ID 배열',
      schema: {
        type: 'object',
        properties: {
          categoryId: {
            type: 'array',
            items: {
              type: 'integer',
            },
            example: [3, 4, 5],
            description: '추천할 카테고리 ID 목록',
          },
        },
        required: ['categoryId'],
        example: {
          categoryId: [3, 4, 5],
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '추천 카테고리 갱신 성공',
      schema: {
        example: {
          added: [1, 3, 5],
          removed: [2, 4],
        },
      },
    }),
  );
}
