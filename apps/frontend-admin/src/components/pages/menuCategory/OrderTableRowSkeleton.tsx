interface OrderTableRowSkeletonProps {
  idx: number;
}

export default function OrderTableRowSkeleton({
  idx,
}: OrderTableRowSkeletonProps) {
  return (
    <div key={idx} className="w-full animate-pulse space-y-2 mt-5 ml-5">
      <div className="h-14 bg-gray-200 rounded" />
      <div className="h-14 bg-gray-100 rounded ml-15" />
      <div className="h-14 bg-gray-100 rounded ml-15" />
    </div>
  );
}
