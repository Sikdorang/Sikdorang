import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { UpdateMenuDetailsDto } from '../dto/update-menu-details.dto';

export function UpdateMenuDetailsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '단일 메뉴 상세 정보 수정' }),
    ApiParam({ name: 'menuId', example: 1, description: '수정할 메뉴 ID' }),
    ApiBody({ type: UpdateMenuDetailsDto }),
    ApiResponse({
      status: 200,
      description: '수정된 메뉴 정보 반환',
      schema: {
        example: {
          id: 1,
          menu: '순두부찌개',
          price: 8000,
          order: '2',
          status: 'SALE',
          categoryId: 3,
          storeId: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: { example: { message: '메뉴 상세정보 수정 중 오류 발생' } },
    }),
  );
}
