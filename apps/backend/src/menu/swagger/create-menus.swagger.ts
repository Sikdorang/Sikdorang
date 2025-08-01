import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateMenuDto } from '../dto/create-menu.dto';

export function CreateMenusSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '메뉴 여러 개 생성' }),
    ApiBody({
      description: '생성할 메뉴 목록',
      isArray: true,
      type: CreateMenuDto,
      examples: {
        example1: {
          summary: '예시 요청',
          value: [
            {
              menu: '김치찌개',
              price: 8000,
              categoryId: 1,
              status: 'SALE',
              order: '1',
            },
            {
              menu: '제육볶음',
              price: 8500,
              categoryId: 2,
              status: 'SALE',
              order: '2',
            },
          ],
        },
      },
    }),
    ApiResponse({ status: 201, description: '메뉴 생성 성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 500, description: '서버 오류' }),
  );
}
