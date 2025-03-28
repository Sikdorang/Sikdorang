import React from 'react';
import Image from 'next/image';

import closeIcon from '../../../../public/icons/ic_x.svg';

interface ProductTagProps {
  text: string;
  variant?: 'default' | 'editable';
}

export default function ProductTag({ text, variant = 'default' }: ProductTagProps) {
  const baseClass =
    'inline-flex items-center text-label-xs-m bg-gray-100 border rounded-[4px] border-gray-300 focus:outline-none transition';
  const variantClass =
    variant === 'editable' ? 'py-[6px] px-[8px] text-gray-700 hover:bg-gray-200' : 'py-[4px] px-[6px] text-gray-700';

  return (
    <div className={`${baseClass} ${variantClass}`}>
      <span>{text}</span>
      {variant === 'editable' && (
        <button
          className="ml-[8px] flex items-center justify-center w-[16px] h-[16px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image src={closeIcon} alt="Close" className="w-[6px] h-[6px]" />
        </button>
      )}
    </div>
  );
}
