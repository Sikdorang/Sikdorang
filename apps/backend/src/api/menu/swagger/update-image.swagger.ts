import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const UpdateImageSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '메뉴 이미지 수정',
      description:
        '특정 메뉴의 이미지를 수정합니다. `image`는 S3 업로드 후 받은 key 또는 URL을 사용합니다.',
    }),
    ApiParam({
      name: 'menuId',
      required: true,
      description: '수정할 메뉴 ID',
      example: 1,
    }),
    ApiBody({
      description: '수정할 이미지 정보 배열',
      isArray: true,
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              description: '이미지 이름',
              example: 'stores/2/menus/1/1754785343278-837p4768pgy.png',
            },
            order: {
              type: 'string',
              description: '이미지 표시 순서',
              example: '1',
            },
          },
          required: ['image', 'order'],
        },
        example: [
          {
            image: 'stores/2/menus/1/1754785343278-837p4768pgy.png',
            order: '1',
          },
          {
            image: 'stores/2/menus/1/1754785343278-837p4768pgy.png',
            order: '2',
          },
        ],
      },
    }),
    ApiResponse({
      status: 200,
      description: '이미지 수정 성공',
      schema: {
        example: {
          id: 10,
          image: 'stores/2/menus/1/1754785343278-837p4768pgy.png',
          order: '1',
          menuId: 1,
          deleted: false,
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '이미지 또는 메뉴를 찾을 수 없음',
      schema: {
        example: { message: '해당 이미지를 찾을 수 없습니다.' },
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: {
        example: { message: '서버 오류가 발생했습니다.' },
      },
    }),
  );
