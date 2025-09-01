import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetRecommendationTypeDataSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 모드 조회',
      description:
        '매장의 현재 추천 모드를 조회합니다. SIMPLE 또는 PRECISE 모드 중 하나를 반환합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '추천 모드 조회 성공',
      schema: {
        type: 'object',
        properties: {
          recommendationMode: {
            type: 'string',
            enum: ['SIMPLE', 'PRECISE'],
            example: 'SIMPLE',
            description: '현재 설정된 추천 모드',
          },
        },
        example: {
          recommendationMode: 'SIMPLE',
        },
      },
    }),
  );
}
