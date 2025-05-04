import { axiosInstance } from '.';

export interface OrderUpdatePayload {
  id: number;
  order: string;
}

export const OrderAPI = {
  updateOrder: async (type: 'categories' | 'menus', items: OrderUpdatePayload[]) => {
    const res = await axiosInstance.post(`/order?type=${type}`, items);
    return res.data;
  },
};
