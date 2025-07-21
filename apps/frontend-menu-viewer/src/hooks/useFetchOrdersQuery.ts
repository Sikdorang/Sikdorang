import { orderAPI } from '@/apis/order/order.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useFetchOrdersQuery(userId: string) {
  return useSuspenseQuery<IOrderItem[]>({
    queryKey: ['orders', userId],
    queryFn: () => orderAPI.fetchOrders(userId),
    retry: false,
  });
}
