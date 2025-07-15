import { useEffect, useRef, useState } from 'react';

export function useCarousel(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isTransitioning = useRef(false);

  const currentList =
    images.length === 0
      ? []
      : [images[images.length - 1], ...images, images[0]];

  const updateTransform = (index: number, immediate = false) => {
    const element = carouselRef.current;
    if (!element) return;

    if (immediate) {
      element.style.transition = 'none';
    }

    element.style.transform = `translateX(-${index * 100}%)`;
  };

  useEffect(() => {
    updateTransform(currentIndex);
  }, [currentIndex]);

  const slideToIndex = (targetIndex: number) => {
    handleSlide(targetIndex - currentIndex);
  };

  const handleSlide = (direction: number) => {
    const element = carouselRef.current;
    if (!element || isTransitioning.current) return;

    isTransitioning.current = true;
    const newIndex = currentIndex + direction;

    element.style.transition = 'all 0.4s ease-in-out';
    updateTransform(newIndex);

    const handleTransitionEnd = () => {
      element.removeEventListener('transitionend', handleTransitionEnd);

      if (newIndex === images.length + 1) {
        updateTransform(1, true);
        setCurrentIndex(1);
      } else if (newIndex === 0) {
        updateTransform(images.length, true);
        setCurrentIndex(images.length);
      } else {
        setCurrentIndex(newIndex);
      }

      isTransitioning.current = false;
    };

    element.addEventListener('transitionend', handleTransitionEnd);

    // 혹시 모를 transitionend 누락을 대비한 타임아웃
    const timeoutId = setTimeout(() => {
      handleTransitionEnd();
    }, 450);

    element.addEventListener(
      'transitionend',
      () => {
        clearTimeout(timeoutId);
      },
      { once: true },
    );
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (deltaX > threshold) handleSlide(1);
    else if (deltaX < -threshold) handleSlide(-1);
  };

  return {
    currentIndex,
    slideToIndex,
    carouselRef,
    currentList,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
