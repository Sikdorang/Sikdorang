import { IMenuItem } from '@/types/model/menu';
import React from 'react';
import Image from 'next/image';
import MenuTagList from './MenuTagList';

interface MenuModalProps {
  item: IMenuItem;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleContentClick} className="bg-white rounded-md shadow-xl p-6 z-60 w-[90%] max-w-md">
      <div className="flex flex-col gap-0.5">
        {item.images.length > 0 && (
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={item.images[0]} alt={`${item.name} 이미지`} fill className="object-cover rounded-sm" />
          </div>
        )}
        {item.tags && item.tags.length > 0 && <MenuTagList tags={item.tags} />}
        <h2 className="text-body-md-sm text-gray-900">{item.name}</h2>
        <p className="text-body-sm text-gray-500">{item.description}</p>
      </div>
      <p className="text-body-md-m text-gray-800">{item.price.toLocaleString()}원</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}
