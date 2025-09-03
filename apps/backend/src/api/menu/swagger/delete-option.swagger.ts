import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteOptionSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '메뉴 옵션 삭제',
      description: '특정 메뉴 옵션을 삭제합니다.',
    }),
    ApiParam({
      name: 'optionId',
      description: '삭제할 옵션 ID',
      example: 1,
      required: true,
    }),
    ApiResponse({ status: 200, description: '옵션 삭제 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 404, description: '옵션을 찾을 수 없음' }),
    ApiResponse({ status: 500, description: '서버 오류' }),
  );
}
