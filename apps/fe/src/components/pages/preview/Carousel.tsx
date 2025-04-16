import Image from 'next/image';
import ArrowBackIcon from '@public/icons/ic_arrow_back.svg';
import ArrowForwardIcon from '@public/icons/ic_arrow_forward.svg';
import CarouselButton from './CarouselButton';
import { useCarousel } from '@/hooks/useCarousel';

interface CarouselProps {
  images: string[];
}

// TODO: touch slide

export default function Carousel({ images }: CarouselProps) {
  const { currentIndex, currentList, carouselRef, handleSlide } = useCarousel(images);

  return (
    <div className="relative overflow-hidden">
      <div ref={carouselRef} className="flex scroll-smooth snap-x snap-mandatory ">
        {currentList?.map((src, idx) => <CarouselImage key={idx} src={src} />)}
      </div>
      <div className="absolute bottom-0 w-full flex justify-center mb-3">
        <div className="text-label-xs-m bg-gray-900/80 text-white py-1 px-2 rounded-full min-w-10 text-center">
          {((currentIndex - 1 + images.length) % images.length) + 1}/{images.length}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <CarouselButton onClick={() => handleSlide(-1)}>
          <ArrowBackIcon />
        </CarouselButton>
        <CarouselButton onClick={() => handleSlide(1)}>
          <ArrowForwardIcon />
        </CarouselButton>
      </div>
    </div>
  );
}

interface CarouselImageProps {
  src: string;
}
function CarouselImage({ src }: CarouselImageProps) {
  return (
    <div className="relative w-full shrink-0 aspect-[4/3] overflow-hidden rounded-sm snap-center">
      <Image src={src} alt={`carousel-image-%${src}`} fill className="object-cover" />
    </div>
  );
}
