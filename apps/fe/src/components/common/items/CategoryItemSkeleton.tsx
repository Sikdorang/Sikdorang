import TextSkeleton from '../skeletons/TextSkeleton';

export default function CategoryItemSkeleton() {
  return (
    <li
      className="animate-pulse flex flex-col justify-center rounded-sm border px-3 h-10 overflow-hidden select-none
      bg-white border-gray-300"
    >
      <TextSkeleton />
    </li>
  );
}
