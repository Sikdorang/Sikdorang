import CategoryItemSkeleton from '@/components/common/items/CategoryItemSkeleton';

export default function CategoryListSkeleton() {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {Array.from({ length: 9 }).map((_, i) => (
        <CategoryItemSkeleton key={i} />
      ))}
    </ul>
  );
}
