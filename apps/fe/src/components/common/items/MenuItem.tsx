import { IMenuItem } from '@/types/model/menu';
import DragHandleIcon from '@public/icons/ic_drag_handle.svg';
import Image from 'next/image';

interface MenuItemProps {
  item: IMenuItem;
  draggable?: boolean;
}

export default function MenuItem({ item, draggable = false }: MenuItemProps) {
  const isEditing = false;

  return (
    <div
      className={`group relative rounded-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300 bg-white ${!item.status ? 'cursor-not-allowed' : isEditing ? 'cursor-grab' : 'cursor-pointer'}`}
    >
      {draggable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <DragHandleIcon className="text-white" />
        </div>
      )}

      <div className="relative w-full overflow-hidden aspect-[8/7]">
        <Image
          className={`${!item.status && 'blur-xs grayscale'} object-cover w-full h-full transition-all duration-300 hover:scale-105`}
          src={item.images[0] || '/placeholder.jpg'}
          width={400}
          height={400}
          alt={item.images[0] || '이미지'}
        />
        {!item.status && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="text-body-sm text-gray-700">품절</span>
          </div>
        )}
      </div>
      <div className={`flex flex-col gap-2 p-4 ${!item.status && 'opacity-50'}`}>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-body-md-sm text-gray-900">{item.name}</h3>
          <p className="text-body-sm text-gray-500 line-clamp-1">{item.description}</p>
        </div>
        <p className="text-body-md-m text-gray-800">{item.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
