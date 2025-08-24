'use client';

import FilterBar from '@/components/pages/history/FilterBar';
import OrderDetail, {
  OrderDetailData,
} from '@/components/pages/history/OrderDetail';
import OrderTable, { Order } from '@/components/pages/history/OrderTable';
import { useState } from 'react';

export default function HistoryPage() {
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [sort, setSort] = useState('newest');
  const [orders] = useState<Order[]>([
    { id: '1', date: '2025.05.04 (10:40)', number: 'AEI389XS' },
    // …추가 데이터
  ]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [detail] = useState<OrderDetailData>({
    tableNumber: 11,
    time: '08:13',
    sideMenu: [{ name: '토핑', items: ['고수', '계란'] }],
    drinks: [{ name: '소주', quantity: 1 }],
    totalPrice: 35000,
  });

  return (
    <div className="p-10 flex flex-col gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <FilterBar
          status={status}
          startDate={startDate}
          sort={sort}
          setStatus={setStatus}
          setStartDate={setStartDate}
          setSort={setSort}
        />
      </div>
      <div className="flex gap-2">
        <div className="w-3/4">
          <OrderTable orders={orders} onSelect={(o) => setSelected(o)} />
        </div>
        <div className="w-1/4">
          <OrderDetail detail={selected ? detail : undefined} />
        </div>
      </div>
    </div>
  );
}
