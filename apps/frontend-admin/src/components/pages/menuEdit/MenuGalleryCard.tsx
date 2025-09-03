'use client';

import MenuCustomLabel from './MenuCustomLabel';
import CloseIcon from '@public/icons/ic_cancel.svg';
import { useRouter } from 'next/navigation';

interface MenuGalleryCardProps {
  onDelete: (menuId: number) => void;
  item: {
    id: number;
    tags: string[];
    name: string;
    price: string;
  };
}

export default function MenuGalleryCard({
  onDelete,
  item,
}: MenuGalleryCardProps) {
  const router = useRouter();

  return (
    <div
      key={item.id}
      className="flex flex-col gap-2 aspect-square cursor-pointer"
      onClick={() => router.push(`/menu/edit/${item.id}`)}
    >
      <div className="relative h-[300px] w-full aspect-square rounded-2xl bg-gray-100">
        <button
          className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-200"
          aria-label="닫기"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <CloseIcon width={20} height={20} />
        </button>
      </div>
      <div className="flex text-mobile-body-m-semibold text-gray-900 gap-2">
        {item.tags.map((item) => (
          <MenuCustomLabel text={item} isTag={true} />
        ))}
      </div>
      <div className="pl-1 text-mobile-body-s-regular text-gray-900">
        {item.name}
      </div>
      <div className="pl-1 text-mobile-body-m-semibold text-gray-600">
        {item.price}
      </div>
    </div>
  );
}
