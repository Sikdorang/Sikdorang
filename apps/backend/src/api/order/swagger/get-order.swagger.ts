import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetOrderSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: '주문 내역 조회',
      description:
        'storeId는 JWT 가드에서 추출, token은 헤더에서 읽어 해당 고객의 주문 내역을 반환합니다. 최근 주문이 먼저 옵니다.',
    }),
    // 필요 없는 헤더면 제거하세요
    ApiHeader({
      name: 'pin-authorization',
      description: '예: Bearer <토큰>. (태블릿/모바일 주문 토큰)',
      required: false,
    }),
    ApiHeader({
      name: 'authorization',
      description: '예: Bearer <토큰>. (일반 인증 헤더 사용 시)',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: '주문 내역 조회 성공',
      schema: {
        example: {
          orders: [
            {
              orderId: 12,
              createdAt: '2025-08-12T03:25:10.000Z',
              tableNumber: 5,
              storeId: 2,
              totalPrice: 48000,
              items: [
                {
                  orderItemId: 101,
                  menuId: 5,
                  menuName: '참소라 무침',
                  quantity: 2,
                  unitPrice: 25000,
                  optionExtraPerUnit: 500,
                  lineTotal: 51000,
                  selectedOptions: [
                    {
                      menuOptionId: 12,
                      menuOptionName: '맵기 옵션',
                      optionDetails: [
                        { optionDetailId: 101, name: '기본맛', price: 0 },
                        { optionDetailId: 102, name: '보통맛', price: 500 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '인증 실패(헤더 누락/만료 등)',
      schema: { example: { message: 'Unauthorized' } },
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: {
        example: { message: '주문 내역 조회 중 오류가 발생했습니다.' },
      },
    }),
  );
