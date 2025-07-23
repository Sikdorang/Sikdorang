export default function MenuGalleryCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 aspect-square animate-pulse rounded-2xl bg-white p-2">
      <div className="h-[300px] w-full rounded-2xl bg-gray-100" />
      <div className="flex gap-2">
        <div className="h-6 w-12 rounded-full bg-gray-100" />
        <div className="h-6 w-12 rounded-full bg-gray-100" />
      </div>
      <div className="h-5 w-3/4 rounded bg-gray-100" />
      <div className="h-6 w-1/2 rounded bg-gray-100" />
    </div>
  );
}
