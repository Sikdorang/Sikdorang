import TextSkeleton from '../skeletons/TextSkeleton';

export default function MenuItemSkeleton() {
  return (
    <div className={`animate-pulse relative rounded-sm overflow-hidden border border-gray-300 bg-white`}>
      <div className="w-full aspect-[8/7] bg-gray-200"></div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-1">
          <TextSkeleton lastLineWidthPercent={0.7} />
          <TextSkeleton />
        </div>
        <TextSkeleton lastLineWidthPercent={0.3} />
      </div>
    </div>
  );
}
