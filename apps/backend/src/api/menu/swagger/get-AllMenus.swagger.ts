import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const GetAllMenusSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '가게 메뉴 전체 조회',
      description:
        '가게의 카테고리별 메뉴와 이미지 정보를 모두 가져옵니다. ' +
        'storeId는 JWT에서 추출하므로 클라이언트에서 전달할 필요가 없습니다.',
    }),
    ApiOkResponse({
      description: '카테고리별 메뉴 목록',
      schema: {
        example: [
          {
            id: '1',
            category: '추천 메뉴',
            items: [
              {
                id: '1',
                name: '참소라 무침',
                price: 25000,
                isNew: true,
                isPopular: true,
                imgUrl: 'https://i.imgur.com/sbLBtXL.jpeg',
                order: 1,
              },
              {
                id: '2',
                name: '오징어 숙회',
                price: 18000,
                isNew: false,
                isPopular: true,
                imgUrl: 'https://i.imgur.com/sbLBtXL.jpeg',
                order: 2,
              },
            ],
          },
          {
            id: '2',
            category: '식사류',
            items: [
              {
                id: '4',
                name: '김치찌개',
                price: 9000,
                isNew: false,
                isPopular: false,
                imgUrl: 'https://i.imgur.com/sbLBtXL.jpeg',
                order: 1,
              },
            ],
          },
        ],
      },
    }),
  );
