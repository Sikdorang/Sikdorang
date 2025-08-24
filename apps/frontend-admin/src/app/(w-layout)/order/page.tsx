'use client';

import OrderCategory from '../../../components/common/buttons/CtaButton';
import OrderListItem from '../../../components/pages/order/OrderListItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OrderPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<
    '전체주문' | '완료주문' | '삭제주문'
  >('전체주문');

  const [tableOrdersData, setTableOrdersData] = useState([
    {
      tableNumber: 1,
      items: [
        {
          id: 1,
          name: '소주',
          quantity: 1,
          isSelected: true,
          options: ['메모맛'],
        },
        { id: 2, name: '맥주', quantity: 2, isSelected: false },
        { id: 3, name: '박은석', quantity: 1, isSelected: false },
        { id: 4, name: '한승연', quantity: 1, isSelected: false },
        { id: 5, name: '이상현', quantity: 1, isSelected: false },
      ],
    },
    {
      tableNumber: 2,
      items: [
        { id: 6, name: '맥주', quantity: 3, isSelected: true },
        {
          id: 7,
          name: '치킨',
          quantity: 1,
          isSelected: true,
          options: ['양념', '순살'],
        },
        { id: 8, name: '마갈리', quantity: 2, isSelected: false },
        {
          id: 9,
          name: '피자',
          quantity: 1,
          isSelected: false,
          options: ['페퍼로니'],
        },
      ],
    },
    {
      tableNumber: 3,
      items: [
        { id: 10, name: '삼겹살', quantity: 2, isSelected: false },
        {
          id: 11,
          name: '소주',
          quantity: 4,
          isSelected: true,
          options: ['참이슬'],
        },
        { id: 12, name: '김치찌개', quantity: 1, isSelected: false },
        { id: 13, name: '공기밥', quantity: 3, isSelected: false },
        { id: 14, name: '맛있는 마갈리', quantity: 1, isSelected: true },
        { id: 15, name: '콜라', quantity: 2, isSelected: false },
      ],
    },
    {
      tableNumber: 4,
      items: [
        {
          id: 16,
          name: '파스타',
          quantity: 1,
          isSelected: true,
          options: ['크림', '알리오올리오'],
        },
        {
          id: 17,
          name: '와인',
          quantity: 1,
          isSelected: false,
          options: ['레드'],
        },
        { id: 18, name: '샐러드', quantity: 1, isSelected: false },
      ],
    },
    {
      tableNumber: 5,
      items: [
        { id: 19, name: '우동', quantity: 2, isSelected: false },
        {
          id: 20,
          name: '튀김',
          quantity: 1,
          isSelected: true,
          options: ['새우', '야채'],
        },
        { id: 21, name: '맛없는 마갈리', quantity: 1, isSelected: false },
        { id: 22, name: '이유진', quantity: 1, isSelected: true },
        { id: 23, name: '이정민', quantity: 1, isSelected: false },
      ],
    },
    {
      tableNumber: 6,
      items: [
        { id: 19, name: '우동', quantity: 2, isSelected: false },
        {
          id: 20,
          name: '튀김',
          quantity: 1,
          isSelected: true,
          options: ['새우', '야채'],
        },
        { id: 21, name: '맛없는 마갈리', quantity: 1, isSelected: false },
        { id: 22, name: '이유진', quantity: 1, isSelected: true },
        { id: 23, name: '이정민', quantity: 1, isSelected: false },
      ],
    },
    {
      tableNumber: 7,
      items: [
        { id: 19, name: '우동', quantity: 2, isSelected: false },
        {
          id: 20,
          name: '튀김',
          quantity: 1,
          isSelected: true,
          options: ['새우', '야채'],
        },
        { id: 21, name: '맛없는 마갈리', quantity: 1, isSelected: false },
        { id: 22, name: '이유진', quantity: 1, isSelected: true },
        { id: 23, name: '이정민', quantity: 1, isSelected: false },
      ],
    },
  ]);

  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

  // 각 테이블의 선택 ID 배열 업데이트
  const handleSelectionChange = (tableNumber: number, ids: number[]) => {
    setSelectedOrderIds((prev) => {
      // 같은 테이블의 이전 ID 제거
      const filtered = prev.filter((id) => {
        const table = tableOrdersData.find(
          (t) => t.tableNumber === tableNumber,
        );
        return table ? !table.items.some((item) => item.id === id) : true;
      });
      return [...filtered, ...ids];
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 'calc(100vh - 90px)' }}
    >
      <div className="wrapper flex w-full flex-col items-center justify-center pb-4 gap-8">
        <div className="flex gap-4 w-full">
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
      </div>

      <div className="max-w-[1200px] flex w-full py-4 gap-8 bg-gray-300 flex-1 overflow-x-auto overflow-y-hidden rounded-md">
        <div className="flex gap-4 p-4 px-8">
          {tableOrdersData.map((tableData) => (
            <OrderListItem
              key={tableData.tableNumber}
              tableNumber={tableData.tableNumber}
              items={tableData.items}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
