import GripIcon from '@public/icons/ic_dots.svg';
import React from 'react';

interface ShopGuideItemProps {
  icon?: string;
  title?: string;
  description?: string;
}

export default function ShopGuideItem({
  icon,
  title = '제목',
  description,
  ...rest
}: ShopGuideItemProps) {
  return (
    <div className="w-full px-6 py-4 flex gap-4 items-center">
      <GripIcon />
      {icon && React.createElement(icon)}
      <div className="flex gap-1 items-center text-mb-5">
        <div>{title}</div>
        <div className="w-1 h-1 bg-gray-300 rounded-full text-mb-6" />
        <div>{description}</div>
      </div>
    </div>
  );
}
