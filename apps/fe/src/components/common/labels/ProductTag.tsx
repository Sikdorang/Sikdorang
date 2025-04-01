import React from 'react';
import Image from 'next/image';

import closeIcon from '../../../../public/icons/ic_x.svg';

interface ProductTagProps {
  text: string;
  variant?: 'default' | 'editable';
  onClick?: () => void;
  onDelete?: () => void;
}

export default function ProductTag({ text, variant = 'default', onClick, onDelete }: ProductTagProps) {
  const baseClass =
    'inline-flex items-center text-label-xs-m bg-gray-100 border rounded-[4px] border-gray-300 focus:outline-none transition';
  const variantClass =
    variant === 'editable' ? 'py-[6px] px-[8px] text-gray-700 hover:bg-gray-200' : 'py-[4px] px-[6px] text-gray-700';

  return (
    <div className={`${baseClass} ${variantClass}`} onClick={onClick}>
      <span>{text}</span>
      {variant === 'editable' && (
        <button
          className="ml-[8px] flex items-center justify-center w-[16px] h-[16px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        >
          <Image src={closeIcon} alt="Close" className="w-[6px] h-[6px]" />
        </button>
      )}
    </div>
  );
}
