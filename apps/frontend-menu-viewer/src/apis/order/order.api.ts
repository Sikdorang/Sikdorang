import { API_BASE_URL } from '../api';
import axios from 'axios';

export const orderAPI = {
  // 가게의 테이블별 주문 내역 불러오기
  fetchOrders: async (userId: string): Promise<IOrderItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/orders`);
    return response.data;
  },
};
