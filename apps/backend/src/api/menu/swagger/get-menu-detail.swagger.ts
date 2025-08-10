import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const GetMenuDetailSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '메뉴 상세 조회',
      description: '메뉴 ID를 이용해 해당 메뉴의 상세 정보를 조회합니다.',
    }),
    ApiParam({
      name: 'menuId',
      required: true,
      description: '조회할 메뉴 ID',
      example: 12345,
    }),
    ApiResponse({
      status: 200,
      description: '메뉴 상세 조회 성공',
      schema: {
        example: {
          id: '12345',
          name: '참소라 무침',
          description:
            '정말 맛있는 참소라 무침입니다. 이거 안 시키면 평생 후회할거야 @@@',
          price: 25000,
          isNew: true,
          isPopular: true,
          images: [
            'https://cdn.myapp.com/menus/12345/1.jpg',
            'https://cdn.myapp.com/menus/12345/2.jpg',
            'https://cdn.myapp.com/menus/12345/3.jpg',
          ],
          optionGroups: [
            {
              groupId: '2132131233232',
              title: '맵기 옵션',
              required: false,
              minSelectable: 0,
              maxSelectable: 2,
              items: [
                { optionId: '123123', name: '기본맛', price: 0 },
                { optionId: 'med12321313ium', name: '보통맛', price: 500 },
                { optionId: '123213213', name: '매운맛', price: 1000 },
              ],
            },
            {
              groupId: 'sid123123eDish',
              title: '사이드 추가',
              required: true,
              minSelectable: 1,
              maxSelectable: 3,
              items: [
                { optionId: '12312313', name: '공기밥', price: 1000 },
                { optionId: '1231232131313', name: '김치 추가', price: 500 },
                { optionId: 'sdfw1i1323', name: '샐러드', price: 2000 },
              ],
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '해당 메뉴를 찾을 수 없음',
      schema: {
        example: {
          message: '해당 메뉴를 찾을 수 없습니다.',
        },
      },
    }),
  );
