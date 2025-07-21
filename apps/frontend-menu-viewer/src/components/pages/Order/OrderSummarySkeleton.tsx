import TextSkeleton from '@/components/common/TextSkeleton';

export default function OrderSummarySkeleton() {
  return (
    <div className="mb-6 flex justify-between items-center">
      <TextSkeleton />
      <TextSkeleton width="min-w-20" />
    </div>
  );
}
