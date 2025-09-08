'use client';

import OrderCategory from '@/components/common/buttons/CtaButton';
import MenuCustomDropdown from '@/components/pages/menuEdit/MenuCustomDropdown';
import OrderBill from '@/components/pages/order/OrderBill';
import OrderListItem from '@/components/pages/order/OrderListItem';
import { useMenuOrder } from '@/hooks/useMenuOrder';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'table' | 'order'>('order');
  const options = [
    { label: '주문 별로 보기', value: 'order' },
    { label: '테이블 별로 보기', value: 'table' },
  ];
  const [selectedCategory, setSelectedCategory] = useState<
    '전체주문' | '완료주문' | '삭제주문'
  >('전체주문');

  const { menuOrder, fetchMenuOrder, setMenuOrder } = useMenuOrder();

  const debugOrders = [
    {
      orderId: 12,
      createdAt: '2025-08-12T03:25:10.000Z',
      tableNumber: 5,
      storeId: 2,
      totalPrice: 48000,
      items: [
        {
          orderItemId: 101,
          menuId: 5,
          menuName: '참소라 무침',
          quantity: 2,
          unitPrice: 25000,
          optionExtraPerUnit: 500,
          lineTotal: 51000,
          selectedOptions: [
            {
              menuOptionId: 12,
              menuOptionName: '맵기 옵션',
              optionDetails: [
                { optionDetailId: 101, name: '기본맛', price: 0 },
                { optionDetailId: 102, name: '보통맛', price: 500 },
              ],
            },
          ],
        },
        {
          orderItemId: 101,
          menuId: 5,
          menuName: '참소라 무침',
          quantity: 2,
          unitPrice: 25000,
          optionExtraPerUnit: 500,
          lineTotal: 51000,
          selectedOptions: [
            {
              menuOptionId: 12,
              menuOptionName: '맵기 옵션',
              optionDetails: [
                { optionDetailId: 101, name: '기본맛', price: 0 },
                { optionDetailId: 102, name: '보통맛', price: 500 },
              ],
            },
          ],
        },
      ],
    },
    {
      orderId: 13,
      createdAt: '2025-08-13T05:14:22.000Z',
      tableNumber: 2,
      storeId: 2,
      totalPrice: 30000,
      items: [
        {
          orderItemId: 102,
          menuId: 3,
          menuName: '치킨',
          quantity: 1,
          unitPrice: 30000,
          optionExtraPerUnit: 0,
          lineTotal: 30000,
          selectedOptions: [],
        },
      ],
    },
    {
      orderId: 14,
      createdAt: '2025-08-13T05:14:22.000Z',
      tableNumber: 2,
      storeId: 2,
      totalPrice: 30000,
      items: [
        {
          orderItemId: 102,
          menuId: 3,
          menuName: '치킨',
          quantity: 1,
          unitPrice: 30000,
          optionExtraPerUnit: 0,
          lineTotal: 30000,
          selectedOptions: [],
        },
      ],
    },
    {
      orderId: 15,
      createdAt: '2025-08-13T05:14:22.000Z',
      tableNumber: 2,
      storeId: 2,
      totalPrice: 30000,
      items: [
        {
          orderItemId: 102,
          menuId: 3,
          menuName: '치킨',
          quantity: 1,
          unitPrice: 30000,
          optionExtraPerUnit: 0,
          lineTotal: 30000,
          selectedOptions: [],
        },
      ],
    },
    {
      orderId: 16,
      createdAt: '2025-08-13T05:14:22.000Z',
      tableNumber: 2,
      storeId: 2,
      totalPrice: 30000,
      items: [
        {
          orderItemId: 102,
          menuId: 3,
          menuName: '치킨',
          quantity: 1,
          unitPrice: 30000,
          optionExtraPerUnit: 0,
          lineTotal: 30000,
          selectedOptions: [],
        },
      ],
    },
    {
      orderId: 17,
      createdAt: '2025-08-13T05:14:22.000Z',
      tableNumber: 2,
      storeId: 2,
      totalPrice: 30000,
      items: [
        {
          orderItemId: 102,
          menuId: 3,
          menuName: '치킨',
          quantity: 1,
          unitPrice: 30000,
          optionExtraPerUnit: 0,
          lineTotal: 30000,
          selectedOptions: [],
        },
      ],
    },
  ];

  useEffect(() => {
    setMenuOrder(debugOrders);
  }, []);

  // useEffect(() => {
  //   fetchMenuOrder();
  // }, [fetchMenuOrder]);

  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

  const handleSelectionChange = (tableNumber: number, ids: number[]) => {
    setSelectedOrderIds((prev) => {
      const filtered = prev.filter((id) => {
        const table = menuOrder.find((t) => t.tableNumber === tableNumber);
        return table
          ? !table.items.some((item) => item.orderItemId === id)
          : true;
      });
      return [...filtered, ...ids];
    });
  };

  const handleComplete = (orderId: number) => {
    setMenuOrder((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 'calc(100vh - 90px)' }}
    >
      <div className="wrapper flex w-full flex-col items-center justify-center pb-4 gap-8">
        <div className="flex w-full">
          <div className="flex grow gap-4">
            <OrderCategory
              width="fit"
              radius="full"
              text="전체주문"
              color={selectedCategory === '전체주문' ? 'black' : 'white'}
              onClick={() => setSelectedCategory('전체주문')}
            />
            <OrderCategory
              width="fit"
              radius="full"
              text="완료주문"
              color={selectedCategory === '완료주문' ? 'black' : 'white'}
              onClick={() => setSelectedCategory('완료주문')}
            />
            <OrderCategory
              width="fit"
              radius="full"
              text="삭제주문"
              color={selectedCategory === '삭제주문' ? 'black' : 'white'}
              onClick={() => setSelectedCategory('삭제주문')}
            />
          </div>
          <MenuCustomDropdown
            options={options.map((o) => o.label)}
            selectedOption={
              options.find((o) => o.value === viewMode)?.label || ''
            }
            onChange={(label) => {
              const found = options.find((o) => o.label === label);
              if (found) setViewMode(found.value as 'table' | 'order');
            }}
          />
        </div>

        <div className="flex w-full items-center justify-between px-4">
          <div className="text-lg font-semibold text-gray-800">
            현재 주문{' '}
            {viewMode === 'order'
              ? (menuOrder || []).length
              : (menuOrder || []).reduce(
                  (acc, table) => acc + table.items.length,
                  0,
                )}
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="max-w-[1200px] flex w-full py-4 gap-8 bg-gray-300 flex-1 overflow-x-auto overflow-y-hidden rounded-md shadow-2xl">
          <div className="flex gap-4 p-4 px-8">
            {(menuOrder || []).map((tableData) => (
              <OrderListItem
                key={tableData.tableNumber}
                tableNumber={tableData.tableNumber}
                items={tableData.items}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1200px] flex-1 w-full py-4 gap-8 mb-2 bg-gray-300 overflow-x-auto rounded-md shadow-2xl">
          <div className="flex gap-4 px-4" style={{ minWidth: 'max-content' }}>
            {(menuOrder || []).map((order) => (
              <div key={order.orderId} className="flex-shrink-0 w-[300px]">
                <OrderBill
                  order={order}
                  onComplete={handleComplete}
                  onReject={handleComplete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
