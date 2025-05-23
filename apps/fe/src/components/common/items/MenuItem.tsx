import { IMenuItem } from '@/types/model/menu';
import DragHandleIcon from '@public/icons/ic_drag_handle.svg';
import Image from 'next/image';

interface MenuItemProps {
  item: IMenuItem;
  draggable?: boolean;
  onClick?: () => void;
}

export default function MenuItem({ item, onClick, draggable = false }: MenuItemProps) {
  const isEditing = false;

  const cursorClass = (() => {
    if (draggable) return isEditing ? 'cursor-grab' : 'cursor-pointer';
    return item.status ? (isEditing ? 'cursor-grab' : 'cursor-pointer') : 'cursor-not-allowed';
  })();

  const imgUrl =
    item.image_urls.length != 0 ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${item.image_urls[0]}` : undefined;

  return (
    <div onClick={onClick} className={`bg-white group relative overflow-hidden ${cursorClass}`}>
      {draggable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <DragHandleIcon className="text-white" />
        </div>
      )}

      <div className="relative w-full overflow-hidden aspect-[6/5]">
        {!imgUrl ? (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-sm text-gray-400 ">
            이미지가 없습니다
          </div>
        ) : (
          <Image
            className={`rounded-sm ${!draggable && !item.status && 'blur-xs grayscale'} object-cover w-full h-full transition-all duration-300 hover:scale-105`}
            src={imgUrl}
            width={400}
            height={400}
            alt={'이미지'}
          />
        )}
        {!draggable && !item.status && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="text-body-sm text-gray-700">품절</span>
          </div>
        )}
      </div>
      <div className={`flex flex-col gap-3 py-3 ${!draggable && !item.status && 'opacity-50'}`}>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-base tracking-tight text-gray-900 line-clamp-1">
            {item.menu || '메뉴 이름'}
          </h3>
          <p className="font-base text-base text-gray-600 tracking-tight line-clamp-1">{item.details}</p>
        </div>
        <p className="font-bold text-lg tracking-tight text-gray-900">{item.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
