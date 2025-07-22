import { OrdersData } from './data/OrdersData';
import { API_BASE_URL } from '@/apis/api';
import { delay, http, HttpResponse } from 'msw';

export const orderHandler = [
  // 유저의 주문 내역 리스트
  http.get(`${API_BASE_URL}/users/:userId/orders`, async ({ params }) => {
    await delay(1000);

    const rawId = params.userId;
    const userId = Array.isArray(rawId) ? rawId[0] : rawId;
    const userOrders = OrdersData.filter((order) => order.userId === userId);

    return HttpResponse.json(userOrders);
  }),
];
