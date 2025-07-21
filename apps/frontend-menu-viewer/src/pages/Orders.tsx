import OrderSection from '../components/pages/Order/OrderSection';
import OrderSectionSkeleton from '../components/pages/Order/OrderSectionSkeleton';
import Header from '@/components/common/Header';
import { Suspense } from 'react';

export default function Orders() {
  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <Header title="주문내역" />
      <Suspense fallback={<OrderSectionSkeleton />}>
        <OrderSection />
      </Suspense>
    </div>
  );
}
