import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UpdateMenuDto } from '../dto/update-menu.dto';

export function UpdateMenusSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '여러 개의 메뉴 수정' }),
    ApiBody({
      type: UpdateMenuDto,
      isArray: true,
      description: '수정할 메뉴들의 배열',
      examples: {
        example1: {
          summary: '기본 예시',
          value: [
            {
              menuId: 1,
              menu: '된장찌개',
              price: 9000,
              categoryId: 2,
              status: 'SALE',
              order: '1',
            },
            {
              menuId: 2,
              status: 'SOLDOUT',
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '수정된 메뉴 리스트 반환',
      schema: {
        example: [
          {
            id: 1,
            menu: '된장찌개',
            price: 9000,
            categoryId: 2,
            status: 'SALE',
            order: '1',
            storeId: 1,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류 (Internal Server Error)',
      schema: {
        example: {
          message: '메뉴 업데이트 중 오류 발생',
        },
      },
    }),
  );
}
