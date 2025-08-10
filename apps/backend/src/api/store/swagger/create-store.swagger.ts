import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStoreDto } from '../dto/create-store.dto';

export const CreateStoreSwagger = () =>
  applyDecorators(
    ApiTags('Store'),
    ApiBearerAuth(),
    ApiOperation({ summary: '매장 생성' }),
    ApiBody({ type: CreateStoreDto }),
    ApiResponse({
      status: 201,
      description: '매장 생성 성공',
      schema: {
        example: {
          id: 1,
          store: '매장-12345',
          description: '설명',
          wifiId: 'my-wifi',
          wifiPassword: '1234',
          phoneNumber: '010-1234-5678',
          naverPlace: 'https://naver.me/xxxx',
          corkagePossible: true,
          corkageFree: false,
          toilet: '남/여 구분',
          userId: 1,
          createdAt: '2025-07-14T18:55:35.930Z',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      schema: {
        example: {
          message: 'userId not found',
        },
      },
    }),
  );
