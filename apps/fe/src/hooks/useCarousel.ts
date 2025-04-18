'use client';

import { useEffect, useRef, useState } from 'react';

export function useCarousel(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const currentList = images.length === 0 ? [] : [images[images.length - 1], ...images, images[0]];

  const updateTransform = (index: number) => {
    const element = carouselRef.current;
    if (element) element.style.transform = `translateX(-${index}00%)`;
  };

  useEffect(() => {
    updateTransform(currentIndex);
  }, [currentIndex]);

  const moveTo = (index: number) => {
    const element = carouselRef.current;
    if (!element) return;

    const handleTransitionEnd = () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
      element.style.transition = '';
      setCurrentIndex(index);
    };

    element.addEventListener('transitionend', handleTransitionEnd);
  };

  const handleSlide = (direction: number) => {
    const element = carouselRef.current;
    if (!element) return;

    const newIndex = currentIndex + direction;
    if (newIndex === images.length + 1) moveTo(1);
    if (newIndex === 0) moveTo(images.length);

    element.style.transition = 'all 0.5s ease-in-out';
    setCurrentIndex(newIndex);
  };

  return {
    currentIndex,
    currentList,
    carouselRef,
    handleSlide,
  };
}
