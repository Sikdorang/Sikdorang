import TextSkeleton from '@/components/common/TextSkeleton';

export default function StoreInfoSectionSkeleton() {
  return (
    <div className="wrapper pb-3 pt-5">
      <div className="mb-3 flex flex-col gap-1">
        <TextSkeleton width="w-20" />
        <TextSkeleton height="h-8" width="w-28" />
      </div>
      <div className="rounded-2xl bg-gray-100 min-h-36 p-4"></div>
    </div>
  );
}
