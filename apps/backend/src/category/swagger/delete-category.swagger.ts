import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const deleteCategorySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '카테고리 삭제' }),
    ApiParam({
      name: 'categoryId',
      required: true,
      description: '삭제할 카테고리 ID',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '카테고리 삭제 성공',
      schema: {
        example: {
          message: '카테고리 삭제 성공',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '카테고리 삭제 중 오류 발생',
      schema: {
        example: {
          message: '카테고리 삭제 중 오류 발생',
        },
      },
    }),
  );
