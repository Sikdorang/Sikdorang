import { axiosInstance } from '.';

export const OrderAPI = {
  getOrder: async () => {
    const response = await axiosInstance.get('/order/store');
    return response.data;
  },
};
