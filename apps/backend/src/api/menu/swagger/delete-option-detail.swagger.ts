import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteOptionDetailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '옵션 상세 삭제',
      description: '특정 옵션 상세 항목을 삭제합니다.',
    }),
    ApiParam({
      name: 'optionDetailId',
      description: '삭제할 옵션 상세 ID',
      example: 1,
      required: true,
    }),
    ApiResponse({ status: 200, description: '옵션 상세 삭제 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 404, description: '옵션 상세를 찾을 수 없음' }),
    ApiResponse({ status: 500, description: '서버 오류' }),
  );
}
