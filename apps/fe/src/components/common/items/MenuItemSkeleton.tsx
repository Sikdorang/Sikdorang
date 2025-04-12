import TextSkeleton from '../skeletons/TextSkeleton';

export default function MenuItemSkeleton() {
  return (
    <div className={`animate-pulse relative rounded-sm overflow-hidden border border-gray-200  bg-white`}>
      <div className="relative w-full overflow-hidden aspect-[8/7] bg-gray-200"></div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <TextSkeleton />
          <TextSkeleton />
        </div>
        <TextSkeleton />
      </div>
    </div>
  );
}
