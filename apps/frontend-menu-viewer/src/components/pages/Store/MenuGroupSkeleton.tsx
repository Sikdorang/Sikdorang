import MenuItemListSkeleton from './MenuItemListSkeleton';
import TextSkeleton from '@/components/common/TextSkeleton';

export default function MenuGroupSkeleton() {
  return (
    <li className="wrapper flex flex-col pt-3">
      <div className="flex gap-1">
        <TextSkeleton width="w-20" />
        <TextSkeleton width="w-6" />
      </div>
      <MenuItemListSkeleton />
    </li>
  );
}
