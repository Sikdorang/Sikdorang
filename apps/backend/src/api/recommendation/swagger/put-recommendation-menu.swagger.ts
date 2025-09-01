import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function PutRecommendationMenuSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 타입별 메뉴 등록/수정',
      description:
        '추천 타입 ID에 해당하는 추천 메뉴를 등록하거나 교체합니다. 전달된 menuId 배열로 기존 구성을 대체합니다.',
    }),
    ApiParam({
      name: 'recommendationTypeId',
      required: true,
      description: '추천 타입 ID',
      schema: { type: 'integer', example: 1 },
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          menuId: {
            type: 'array',
            items: { type: 'integer' },
            example: [10, 11, 12],
            description: '추천으로 설정할 메뉴 ID 배열',
          },
        },
        required: [],
      },
    }),
    ApiResponse({
      status: 200,
      description: '추천 메뉴 등록/수정 성공',
      schema: {
        example: {
          message: '추천 메뉴가 저장되었습니다.',
        },
      },
    }),
  );
}
