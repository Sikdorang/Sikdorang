import { HTMLAttributes, PropsWithChildren } from 'react';

import TextInput from '@/components/common/inputs/TextInput';
import GrapIcon from '@public/icons/ic_dots.svg';
import DeleteIcon from '@public/icons/ic_trashcan.svg';
import Image from 'next/image';

interface MenuOptionElementProps
  extends HTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export default function MenuOptionElement({
  children,
}: MenuOptionElementProps) {
  return (
    <div className="flex w-full max-w-xl items-center justify-center gap-2">
      <Image src={GrapIcon} alt="option" width={24} height={24} />
      <TextInput label="" placeholder="옵션 이름을 입력해주세요." />
      <TextInput label="" placeholder="가격을 입력해주세요." />
      <div className="text-mobile-body-m-semibold text-gray-700">
        {children}
      </div>
      <button className="bg-chip-redBg hover:bg-chip-redBg/80 flex aspect-square h-12 w-12 items-center justify-center rounded-2xl transition">
        <Image src={DeleteIcon} alt="옵션 삭제" width={24} height={24} />
      </button>
    </div>
  );
}
