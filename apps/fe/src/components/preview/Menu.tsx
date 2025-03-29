import { IMenu } from '@/types/model/menu';
import Image from 'next/image';
import Link from 'next/link';

interface MenuProps {
  item: IMenu;
}

export default function Menu({ item }: MenuProps) {
  const isEditing = false;

  return (
    <Link href={`/${item.id}`}>
      <div
        key={item.id}
        className={`border border-gray-200 rounded-sm flex flex-col ${!item.status ? 'cursor-not-allowed' : isEditing ? 'cursor-grab' : 'cursor-pointer'}`}
      >
        <div className="relative w-full overflow-hidden aspect-[8/7] rounded-sm">
          <Image
            className={`${!item.status && 'blur-xs'} object-cover w-full h-full transition-all duration-300 hover:scale-105`}
            src={item.image || '/placeholder.jpg'}
            width={400}
            height={400}
            alt={item.image || '이미지'}
          />
          {!item.status && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <span className="text-gray-800 label-sm-sb">품절</span>
            </div>
          )}
        </div>
        <div className={`flex flex-col p-6 bg-white gap-2 ${!item.status && 'opacity-40'}`}>
          <div className="flex flex-col gap-1">
            <h2 className="text-title-sm text-gray-900">{item.name}</h2>
            <p className="text-body-sm text-gray-500 line-clamp-2 min-h-12">{item.description}</p>
          </div>
          <p className="text-title-xs text-gray-700">{item.price}원</p>
        </div>
      </div>
    </Link>
  );
}
