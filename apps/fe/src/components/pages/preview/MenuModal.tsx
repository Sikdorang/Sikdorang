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
    <div
      onClick={handleContentClick}
      className="gap-5 flex flex-col bg-white rounded-lg shadow-2xl p-4 z-60 w-[90%] max-w-xl min-h-1/2"
    >
      <div className="h-full">
        <Carousel images={item.images} />
      </div>
      <div className="flex flex-col flex-2 justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-xl tracking-tight text-gray-900 line-clamp-1">
            {item.menu || '메뉴 이름'}
          </h3>
          <p className="font-base text-base text-gray-600 tracking-tight line-clamp-1">{item.details}</p>
        </div>

        <p className="font-bold text-2xl tracking-tight text-gray-900 mb-6">{item.price.toLocaleString()}원</p>
        <BaseButton variant="cancel" onClick={onClose}>
          닫기
        </BaseButton>
      </div>
    </div>
  );
}
