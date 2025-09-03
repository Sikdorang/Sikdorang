import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function DeleteMenusSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '메뉴 여러 개 삭제',
      description: '쿼리 파라미터로 여러 메뉴를 한 번에 삭제합니다.',
    }),
    ApiQuery({
      name: 'ids',
      description: '삭제할 메뉴 ID들 (쉼표로 구분)',
      example: '1,2,3',
      required: true,
    }),
    ApiResponse({ status: 200, description: '메뉴 배치 삭제 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 404, description: '메뉴를 찾을 수 없음' }),
    ApiResponse({ status: 500, description: '서버 오류' }),
  );
}
