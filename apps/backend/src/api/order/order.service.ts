import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  private readonly prisma = new PrismaClient();

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
            tableNumber: createOrderDto.tableNumber ?? null,
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
