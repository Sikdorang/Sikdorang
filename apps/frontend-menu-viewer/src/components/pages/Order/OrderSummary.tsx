import { formatNumber } from '@/utilities/format';

interface OrderSummaryProps {
  totalCount: number;
  totalPrice: number;
}

export default function OrderSummary({
  totalCount,
  totalPrice,
}: OrderSummaryProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-mb-1 text-gray-700">전체 {totalCount ?? 0}건</p>
      <p className="text-mb-1 text-gray-700">
        총 {formatNumber(totalPrice ?? 0)}원
      </p>
    </div>
  );
}
