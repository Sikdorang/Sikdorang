import {
  Menu,
  MenuOption,
  OptionDetail,
  Order,
  OrderItem,
  OrderItemOption,
  OrderItemOptionDetail,
} from '@prisma/client';

export type OrderWithRelations = Order & {
  orderItems: (OrderItem & {
    menu: Menu | null;
    options: (OrderItemOption & {
      menuOption: MenuOption | null;
      optionDetails: (OrderItemOptionDetail & {
        optionDetail: OptionDetail | null;
      })[];
    })[];
  })[];
};
export interface OrderResponseItem {
  orderItemId: number;
  menuId: number;
  menuName?: string;
  quantity: number;
  unitPrice: number;
  optionExtraPerUnit: number;
  lineTotal: number;
  selectedOptions: {
    menuOptionId: number;
    menuOptionName?: string;
    optionDetails: {
      optionDetailId: number;
      name?: string;
      price: number;
    }[];
  }[];
}

export interface OrderResponse {
  orderId: number;
  createdAt: Date;
  tableNumber: number | null;
  storeId: number;
  items: OrderResponseItem[];
  totalPrice: number;
}

export function processOrderToDto(
  orders: OrderWithRelations[],
): OrderResponse[] {
  return orders.map((order) => {
    let orderTotal = 0;

    const items = order.orderItems.map((oi) => {
      const unitPrice = oi.menu?.price ?? 0;
      const optionExtraPerUnit = oi.options.reduce((sum, opt) => {
        const detailsSum = opt.optionDetails.reduce(
          (s, od) => s + (od.optionDetail?.price ?? 0),
          0,
        );
        return sum + detailsSum;
      }, 0);
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
            optionDetailId: od.id,
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
}
