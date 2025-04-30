import TextSkeleton from '../skeletons/TextSkeleton';

export default function MenuItemSkeleton() {
  return (
    <div className={`animate-pulse relative rounded-sm overflow-hidden bg-white`}>
      <div className="w-full aspect-[6/5] bg-gray-200"></div>
      <div className="flex flex-col gap-2.5 py-3">
        <div className="flex flex-col gap-1">
          <TextSkeleton lastLineWidthPercent={0.7} />
          <TextSkeleton />
        </div>
        <TextSkeleton lastLineWidthPercent={0.3} />
      </div>
    </div>
  );
}
