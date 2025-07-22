import OrderCardSkeleton from './OrderCardSkeleton';

export default function OrderListSkeleton() {
  return (
    <ul className="flex flex-col gap-6">
      {Array.from({ length: 2 }).map((_, idx) => (
        <OrderCardSkeleton key={idx} />
      ))}
    </ul>
  );
}
