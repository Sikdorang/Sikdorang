import emptyImage from '@/assets/images/img_empty_images.webp';
import { useEffect, useRef, useState } from 'react';

const CDN_URL = import.meta.env.VITE_CDN_URL;

interface Props {
  imgUrls?: string[];
}

export default function Carousel({ imgUrls = [] }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayUrls = imgUrls.length > 0 ? imgUrls : [''];

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const newIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="relative">
        <div
          ref={carouselRef}
          className="scrollbar-hide flex aspect-square w-full max-w-md snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl"
        >
          {displayUrls.map((src, idx) => (
            <CarouselImage key={idx} src={src} />
          ))}
        </div>
        <div className="text-mc-1 absolute right-2.5 top-2.5 z-10 rounded-full bg-gray-900/60 px-2 py-1 text-white">
          {currentIndex + 1}/{displayUrls.length}
        </div>
      </div>

      <div className="flex h-7 items-center justify-center space-x-1.5">
        {displayUrls.map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full ${
              idx === currentIndex
                ? 'h-2 w-2 bg-gray-800'
                : 'h-1 w-1 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface CarouselImageProps {
  src: string;
}
function CarouselImage({ src }: CarouselImageProps) {
  const imageSrc = src ? `${CDN_URL}/${src}` : emptyImage;
  return (
    <img
      src={imageSrc}
      className="aspect-square w-full max-w-md shrink-0 snap-start object-cover"
      alt=""
    />
  );
}
