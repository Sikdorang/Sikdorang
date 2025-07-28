import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const DeleteMenuSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '메뉴 삭제' }),
    ApiParam({
      name: 'menuId',
      required: true,
      description: '삭제할 메뉴 ID',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '메뉴 삭제 성공',
      schema: {
        example: {
          message: '메뉴 삭제 성공',
          id: 1,
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '메뉴를 찾을 수 없음',
      schema: {
        example: {
          message: '해당 메뉴를 찾을 수 없습니다.',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '삭제 권한 없음',
      schema: {
        example: {
          message: '삭제 권한이 없습니다.',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '메뉴 삭제 중 서버 오류',
      schema: {
        example: {
          message: '서버 내부 오류로 메뉴 삭제에 실패했습니다.',
        },
      },
    }),
  );
