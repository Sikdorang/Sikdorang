import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const { currentIndex, slideToIndex, currentList, carouselRef, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useCarousel(images);
  return (
    <div className="relative overflow-hidden h-full w-full">
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex scroll-smooth snap-x snap-mandatory "
      >
        {currentList?.map((src, idx) => <CarouselImage key={idx} src={src} />)}
      </div>
      <div className="absolute bottom-0 w-full justify-center mb-4 flex flex-wrap gap-1">
        {images.map((_, index) => (
          <div
            onClick={() => slideToIndex(index + 1)}
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${index + 1 === ((currentIndex - 1 + images.length) % images.length) + 1 ? 'bg-white' : 'bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

interface CarouselImageProps {
  src: string;
}
function CarouselImage({ src }: CarouselImageProps) {
  return (
    <div className="relative w-full shrink-0 aspect-[5/3] overflow-hidden rounded-sm snap-center">
      <Image src={src} alt={`carousel-image-%${src}`} fill className="object-cover" />
    </div>
  );
}
