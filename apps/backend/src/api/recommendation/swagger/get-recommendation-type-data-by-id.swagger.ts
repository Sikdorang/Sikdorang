import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationTypeDataByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 타입별 상세 정보 조회',
      description:
        '특정 추천 타입 ID에 해당하는 상세 정보(타입, 관리자 설명, 고객 설명 등)를 조회합니다.',
    }),
    ApiParam({
      name: 'recommendationTypeId',
      required: true,
      description: '추천 타입 ID',
      schema: { type: 'integer', example: 1 },
    }),
    ApiResponse({
      status: 200,
      description: '추천 타입 상세 정보 조회 성공',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          type: { type: 'string', example: '달콤한 와인' },
          adminDescription: {
            type: 'string',
            example: '달콤하고 부드러운 맛의 와인으로 초보자에게 추천합니다.',
            nullable: true,
          },
          customerDescription: {
            type: 'string',
            example: '달콤한 맛이 좋으신 분들께 추천드립니다.',
            nullable: true,
          },
          recommendationMode: {
            type: 'string',
            enum: ['SIMPLE', 'PRECISE'],
            example: 'SIMPLE',
          },
        },
        example: {
          id: 1,
          type: '달콤한 와인',
          adminDescription:
            '달콤하고 부드러운 맛의 와인으로 초보자에게 추천합니다.',
          customerDescription: '달콤한 맛이 좋으신 분들께 추천드립니다.',
          recommendationMode: 'SIMPLE',
        },
      },
    }),
  );
}
