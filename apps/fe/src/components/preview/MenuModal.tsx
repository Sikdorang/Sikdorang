'use client';
import { IMenuItem } from '@/types/model/menu';
import React, { useRef } from 'react';
import Image from 'next/image';
import MenuTagList from './MenuTagList';

interface MenuModalProps {
  item: IMenuItem;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 500;

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleContentClick} className="bg-white rounded-2xl shadow-2xl p-6 z-60 w-[90%] max-w-md">
      <div className="flex flex-col gap-4">
        {/* Carousel */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scroll-hide snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {item.images.map((image, index) => (
              <div key={index} className="relative w-full shrink-0 aspect-[4/3] overflow-hidden rounded-xl snap-center">
                <Image src={image} alt={`${item.name} 이미지 ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
            onClick={handlePrev}
          >
            ◀
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
            onClick={handleNext}
          >
            ▶
          </button>
        </div>

        {item.tags?.length > 0 && <MenuTagList tags={item.tags} />}

        <h2 className="text-body-md-sm text-gray-900">{item.name}</h2>
        <p className="text-body-sm text-gray-500">{item.description}</p>

        <p className="text-body-md-m text-gray-800">{item.price.toLocaleString()}원</p>

        <button onClick={onClose} className="mt-2 self-end text-sm text-gray-500 hover:text-gray-800 transition">
          닫기 ✕
        </button>
      </div>
    </div>
  );
}
