import OrderListSkeleton from './OrderListSkeleton';
import OrderSummarySkeleton from './OrderSummarySkeleton';
import BottomSpace from '@/components/common/BottomSpace';

export default function OrderSectionSkeleton() {
  return (
    <div className="wrapper flex w-full flex-1 flex-col pt-6">
      <OrderSummarySkeleton />
      <OrderListSkeleton />
      <BottomSpace />
    </div>
  );
}
