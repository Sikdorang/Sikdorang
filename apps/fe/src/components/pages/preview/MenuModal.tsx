'use client';
import { IMenuItem } from '@/types/model/menu';
import MenuTagList from './MenuTagList';
import Carousel from './Carousel';
import BaseButton from '@/components/common/buttons/BaseButton';

interface MenuModalProps {
  item: IMenuItem;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleContentClick} className="bg-white rounded-2xl shadow-2xl p-6 z-60 w-[90%] max-w-md">
      <div className="flex flex-col">
        <Carousel images={item.images} />
        <div className="space-y-1 mt-4 mb-6">
          <h2 className="text-body-md-sm text-gray-900">{item.name}</h2>
          <p className="text-body-sm text-gray-500">{item.description}</p>
          {item.tags && item.tags?.length > 0 && <MenuTagList tags={item.tags} />}
          <p className="text-body-md-sm text-gray-800 mt-4">{item.price.toLocaleString()}원</p>
        </div>

        <BaseButton variant="cancel" onClick={onClose}>
          닫기
        </BaseButton>
      </div>
    </div>
  );
}
