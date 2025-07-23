import GripIcon from '@public/icons/ic_dots.svg';
import Image from 'next/image';

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
      <Image src={GripIcon} width={12} height={12} alt={''} />
      {icon && <Image src={icon} width={16} height={16} alt={''} />}
      <div className="flex gap-1 items-center">
        <div>{title}</div>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <div>{description}</div>
      </div>
    </div>
  );
}
