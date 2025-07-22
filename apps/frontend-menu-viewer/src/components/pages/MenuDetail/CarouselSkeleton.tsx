export default function CarouselSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="bg-gray-100 animate-pulse flex aspect-square w-full max-w-md snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl"></div>
      <div className="flex h-7 items-center justify-center space-x-1.5">
        <div className={`rounded-full h-1 w-1 bg-gray-300`}></div>
      </div>
    </div>
  );
}
