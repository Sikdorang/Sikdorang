import OrderListSkeleton from './OrderListSkeleton';
import OrderSummarySkeleton from './OrderSummarySkeleton';

export default function OrderSectionSkeleton() {
  return (
    <div className="wrapper flex w-full flex-1 flex-col pt-6">
      <OrderSummarySkeleton />
      <OrderListSkeleton />
      <div className="h-48"></div>
    </div>
  );
}
