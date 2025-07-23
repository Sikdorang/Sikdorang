import OrderCard from './OrderCard';
import { menuAPI } from '@/apis/menu/menu.api';
import { ORDER_MENU_STATE } from '@/constants/constants';
import { ROUTES } from '@/constants/routes';
import { useCartStore } from '@/stores/useCartStore';
import { convertToCartItems } from '@/utilities/converter';
import { showCustomToast } from '@/utilities/showToast';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface OrderListProps {
  orders: IOrderItem[];
}

export default function OrderList({ orders }: OrderListProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleReorder = async (order: IOrderItem, index: number) => {
    try {
      setLoadingIndex(index);
      const menusMap = await menuAPI.fetchMenuDetailsWithId(
        order.availableMenuIds,
      );
      order.items.forEach((item) => {
        if (
          item.state === ORDER_MENU_STATE.AVAILABLE ||
          item.state === ORDER_MENU_STATE.PRICE_CHANGED
        ) {
          const menu = menusMap[item.id];
          if (!menu) return;

          const cartItem = convertToCartItems(item, menu);
          addItem(cartItem);
        }
      });
      setLoadingIndex(null);
      navigate(ROUTES.CARTS, { replace: true });
    } catch (error) {
      showCustomToast({
        icon: 'error',
        message: '같은 메뉴 주문하기 중에 문제가 발생했어요.',
      });
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <ul className="flex flex-col gap-6">
      {orders.map((order, idx) => (
        <OrderCard
          key={idx}
          index={idx + 1}
          order={order}
          onReorder={() => handleReorder(order, idx)}
          reorderDisabled={
            loadingIndex !== null || order.availableMenuIds.length === 0
          }
        />
      ))}
    </ul>
  );
}
