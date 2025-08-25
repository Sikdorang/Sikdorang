import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function PostRecommendationModeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '추천 모드 설정',
      description:
        '매장의 추천 알고리즘 모드를 설정합니다. SIMPLE 또는 PRECISE 중 하나로 지정할 수 있습니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          recommendationMode: {
            type: 'string',
            enum: ['SIMPLE', 'PRECISE'],
            example: 'SIMPLE',
            description: '추천 모드 (SIMPLE | PRECISE)',
          },
        },
        required: ['recommendationMode'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '추천 모드 설정 성공',
      schema: {
        example: {
          recommendationMode: 'SIMPLE',
          message: '추천 모드가 성공적으로 설정되었습니다.',
        },
      },
    }),
  );
}
