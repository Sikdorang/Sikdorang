import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { OrderSenderGateway } from '../../websocket/order/order-sender.gateway';

import { CreateOrderDto } from './dto/create-order.dto';
import { processOrderToDto } from './utils/order.mapper';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderGateway: OrderSenderGateway,
    private readonly prisma: PrismaClient,
  ) {}
  async getOrders(where: Prisma.OrderWhereInput) {
    try {
      const orders = await this.prisma.order.findMany({
        where,
        include: {
          orderItems: {
            include: {
              menu: true,
              options: {
                include: {
                  menuOption: true,
                  optionDetails: {
                    include: {
                      optionDetail: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return { orders: processOrderToDto(orders) };
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
      const createdOrder = await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            storeId,
            tableNumber: createOrderDto.tableNumber ?? tableNumber,
            token,
          },
        });

        for (const item of createOrderDto.orderItems) {
          const orderItem = await tx.orderItem.create({
            data: {
              orderId: order.id,
              menuId: item.menuId,
              quantity: item.quantity,
            },
          });

          for (const selectedOption of item.selectedOptions) {
            const orderItemOption = await tx.orderItemOption.create({
              data: {
                orderItemId: orderItem.id,
                menuOptionId: selectedOption.menuOptionId,
              },
            });

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

        return order;
      });

      // 주문 전파
      const orderData = await this.getOrders({ storeId, id: createdOrder.id });
      await this.orderGateway.emitOrderCreated(
        `store-${storeId}-order`,
        orderData,
      );

      return { message: '주문에 성공했습니다.' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        '주문 생성 중 오류가 발생했습니다.',
      );
    }
  }
}
