import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const GetStoreSwagger = () =>
  applyDecorators(
    ApiTags('Store'),
    ApiBearerAuth(),
    ApiOperation({ summary: '내 매장 정보 조회' }),
    ApiResponse({
      status: 200,
      description: '매장 정보 조회 성공',
      schema: {
        example: [
          {
            id: 1,
            store: '매장-12345',
            userId: 1,
          },
        ],
      },
    }),
    ApiResponse({
      status: 500,
      description: '매장 정보 조회 중 오류',
      schema: {
        example: {
          message: '매장 정보 조회 중 오류가 발생하였습니다',
        },
      },
    }),
  );
