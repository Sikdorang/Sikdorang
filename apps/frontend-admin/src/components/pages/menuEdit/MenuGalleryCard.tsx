'use client';

import MenuCustomLabel from './MenuCustomLabel';
import CloseIcon from '@public/icons/ic_cancel.svg';
import emptyImage from '@public/images/img_empty_image.png';
import { useRouter } from 'next/navigation';

interface MenuGalleryCardProps {
  onDelete: (menuId: number) => void;
  item: {
    id: number;
    name: string;
    price: number;
    isNew: boolean;
    isPopular: boolean;
    imgUrl?: string;
  };
}

export default function MenuGalleryCard({
  onDelete,
  item,
}: MenuGalleryCardProps) {
  const router = useRouter();
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL;

  return (
    <div
      key={item.id}
      className="flex flex-col gap-2 aspect-square cursor-pointer"
      onClick={() => router.push(`/menu/edit/${item.id}`)}
    >
      <div className="relative h-[300px] w-full aspect-square rounded-2xl bg-gray-100">
        <img
          src={item.imgUrl ? `${CDN_URL}/${item.imgUrl}` : emptyImage.src}
          alt={item.name}
          className="w-full h-full object-cover rounded-2xl"
        />
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
        {item.isPopular && <MenuCustomLabel text="인기" isTag={true} />}
        {item.isNew && <MenuCustomLabel text="신메뉴" isTag={true} />}
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
