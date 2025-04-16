import MenuItemSkeleton from '@/components/common/items/MenuItemSkeleton';

export default function MenuListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </>
  );
}
