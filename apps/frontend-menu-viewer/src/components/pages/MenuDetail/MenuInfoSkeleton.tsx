import CarouselSkeleton from './CarouselSkeleton';
import TextSkeleton from '@/components/common/TextSkeleton';

export default function MenuInfoSkeleton() {
  return (
    <div className="wrapper">
      <div className="mb-3 mt-6">
        <CarouselSkeleton />
      </div>
      <div className="mb-1">
        <TextSkeleton width="w-20" />
      </div>
      <TextSkeleton width="w-2/3" />
      <div className="mt-3 flex items-center justify-between">
        <TextSkeleton width="w-20" height="h-6" />
        <TextSkeleton width="w-20" height="h-6" />
      </div>
    </div>
  );
}
