import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateOrderSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '주문 생성',
      description: '새로운 주문을 생성합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'user-session-token-1234' },
          tableNumber: {
            type: 'number',
            nullable: true,
            example: 5,
            description: '태블릿 주문일 때만 입력합니다.',
          },
          storeId: { type: 'number', example: 1 },
          orderItems: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                menuId: { type: 'number', example: 2 },
                quantity: { type: 'number', example: 3 },
                options: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      menuOptionId: { type: 'number', example: 1 },
                      optionDetails: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            optionDetailId: { type: 'number', example: 10 },
                          },
                          required: ['optionDetailId'],
                        },
                        example: [
                          { optionDetailId: 10 },
                          { optionDetailId: 11 },
                        ],
                      },
                    },
                    required: ['menuOptionId', 'optionDetails'],
                  },
                  example: [
                    {
                      menuOptionId: 1,
                      optionDetails: [{ optionDetailId: 10 }],
                    },
                  ],
                },
              },
              required: ['menuId', 'quantity'],
            },
          },
        },
        required: ['token', 'storeId', 'orderItems'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '주문 생성 성공',
      schema: {
        example: {
          id: 1,
          token: 'user-session-token-1234',
          createdAt: '2025-08-12T12:00:00.000Z',
          tableNumber: 5,
          storeId: 1,
          orderItems: [
            {
              id: 1,
              menuId: 2,
              quantity: 3,
              options: [
                {
                  id: 1,
                  menuOptionId: 1,
                  optionDetails: [
                    { id: 1, optionDetailId: 10 },
                    { id: 2, optionDetailId: 11 },
                  ],
                },
              ],
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      schema: {
        example: {
          message: 'storeId, orderItems는 필수 값입니다.',
        },
      },
    }),
  );
