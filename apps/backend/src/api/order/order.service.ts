import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  private readonly prisma = new PrismaClient();

  async getOrder({ storeId, token }: { storeId: number; token: string }) {
    try {
      const orders = await this.prisma.order.findMany({
        where: { token },
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: {
              menu: true, // 메뉴 이름/가격
              options: {
                include: {
                  menuOption: true, // 옵션 그룹명
                  optionDetails: {
                    include: {
                      optionDetail: true, // 옵션 상세명/가격
                    },
                  },
                },
              },
            },
          },
        },
      });

      // 응답 가공 + 금액 계산
      const result = orders.map((order) => {
        let orderTotal = 0;

        const items = order.orderItems.map((oi) => {
          const unitPrice = oi.menu?.price ?? 0;

          // 이 아이템에 붙은 옵션 상세들의 추가 금액 합
          const optionExtraPerUnit = oi.options.reduce((sum, opt) => {
            const detailsSum = opt.optionDetails.reduce((s, od) => {
              return s + (od.optionDetail?.price ?? 0);
            }, 0);
            return sum + detailsSum;
          }, 0);

          // 수량에 따라 옵션 가격도 곱해줌(옵션은 개당 부과된다고 가정)
          const lineTotal = (unitPrice + optionExtraPerUnit) * oi.quantity;
          orderTotal += lineTotal;

          return {
            orderItemId: oi.id,
            menuId: oi.menuId,
            menuName: oi.menu?.menu,
            quantity: oi.quantity,
            unitPrice,
            optionExtraPerUnit,
            lineTotal,
            selectedOptions: oi.options.map((opt) => ({
              menuOptionId: opt.menuOptionId,
              menuOptionName: opt.menuOption?.option,
              optionDetails: opt.optionDetails.map((od) => ({
                optionDetailId: od.optionDetailId,
                name: od.optionDetail?.optionDetail,
                price: od.optionDetail?.price ?? 0,
              })),
            })),
          };
        });

        return {
          orderId: order.id,
          createdAt: order.createdAt,
          tableNumber: order.tableNumber,
          storeId: order.storeId,
          items,
          totalPrice: orderTotal,
        };
      });

      return { orders: result };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        '주문 내역 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async createOrder({
    storeId,
    createOrderDto,
    tableNumber,
    token,
  }: {
    storeId: number;
    createOrderDto: CreateOrderDto;
    tableNumber: number;
    token: string;
  }) {
    try {
      return this.prisma.$transaction(async (tx) => {
        // 1. 주문 생성
        const order = await tx.order.create({
          data: {
            storeId,
            tableNumber: createOrderDto.tableNumber ?? tableNumber,
            token,
          },
        });

        // 2. 주문 아이템 생성
        for (const item of createOrderDto.orderItems) {
          const orderItem = await tx.orderItem.create({
            data: {
              orderId: order.id,
              menuId: item.menuId,
              quantity: item.quantity,
            },
          });

          // 3. 주문 아이템 옵션 생성
          for (const selectedOption of item.selectedOptions) {
            const orderItemOption = await tx.orderItemOption.create({
              data: {
                orderItemId: orderItem.id,
                menuOptionId: selectedOption.menuOptionId,
              },
            });

            // 4. 옵션 상세 생성
            for (const optionDetailId of selectedOption.optionDetailIds) {
              await tx.orderItemOptionDetail.create({
                data: {
                  orderItemOptionId: orderItemOption.id,
                  optionDetailId,
                },
              });
            }
          }
        }

        return { message: '주문에 성공했습니다.' };
      });
    } catch (error) {
      console.error(error);
      throw new Error('주문 생성 중 오류가 발생했습니다.');
    }
  }
}
