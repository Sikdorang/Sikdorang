import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import Header from '@/components/common/Header';
import OrderSection from '@/components/pages/Order/OrderSection';
import OrderSectionSkeleton from '@/components/pages/Order/OrderSectionSkeleton';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Suspense } from 'react';

export default function Orders() {
  useScrollToTop();

  return (
    <BaseResponsiveLayout>
      <div className="flex h-full w-full flex-col">
        <Header title="주문내역" />
        <Suspense fallback={<OrderSectionSkeleton />}>
          <OrderSection />
        </Suspense>
      </div>
    </BaseResponsiveLayout>
  );
}
