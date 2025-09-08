export interface OrderResponse {
  orderId: number;
  createdAt: string;
  tableNumber: number;
  storeId: number;
  totalPrice: number;
  items: {
    orderItemId: number;
    menuId: number;
    menuName: string;
    quantity: number;
    unitPrice: number;
    optionExtraPerUnit: number;
    lineTotal: number;
    selectedOptions: {
      menuOptionId: number;
      menuOptionName: string;
      optionDetails: {
        optionDetailId: number;
        name: string;
        price: number;
      }[];
    }[];
  }[];
}
