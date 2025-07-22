import TextSkeleton from '@/components/common/TextSkeleton';

export default function MenuItemSkeleton() {
  return (
    <li className="flex gap-5 py-3 md:flex-col-reverse md:gap-2 md:py-0">
      <div className="flex flex-1 flex-col gap-1">
        <TextSkeleton width="w-20" />
        <TextSkeleton width="w-24" />
      </div>
      <div className="aspect-square h-[157px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[216px] md:h-auto md:w-full"></div>
    </li>
  );
}
