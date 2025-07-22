import CategoryTabItemSkeleton from './CategoryTabItemSkeleton';

export default function CategoryTabListSkeleton() {
  return (
    <div className="scrollbar-hide sticky top-12 w-full overflow-x-auto bg-white py-3">
      <ul className="flex w-fit items-center gap-2 px-5 xl:mx-auto xl:w-full xl:max-w-5xl">
        {Array.from({ length: 4 }).map((_, idx) => (
          <CategoryTabItemSkeleton key={idx} />
        ))}
      </ul>
    </div>
  );
}
