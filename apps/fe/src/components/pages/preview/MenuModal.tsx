'use client';
import { IMenuItem } from '@/types/model/menu';
import Carousel from './Carousel';
import BaseButton from '@/components/common/buttons/BaseButton';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

interface MenuModalProps {
  item: IMenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    history.pushState(null, '', location.href);
    const handlePopState = () => onClose();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        onClick={handleContentClick}
        className="gap-5 flex flex-col bg-white rounded-lg shadow-2xl p-4 z-60 w-[90%] max-w-xl min-h-1/3"
      >
        <div className="h-full">
          <Carousel images={item.image_urls} />
        </div>
        <div className="flex flex-col flex-2 justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-xl tracking-tight text-gray-900 line-clamp-1">
              {item.menu || '메뉴 이름'}
            </h3>
            <p className="font-base text-base text-gray-600 tracking-tight max-h-24 overflow-y-auto">{item.details}</p>
          </div>

          <p className="font-bold text-2xl tracking-tight text-gray-900 mb-6">{item.price.toLocaleString()}원</p>
          <BaseButton variant="cancel" onClick={onClose}>
            닫기
          </BaseButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
