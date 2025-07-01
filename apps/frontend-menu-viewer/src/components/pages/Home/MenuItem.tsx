import Chip from '@/components/common/Chip';
import formatNumber from '@/utils/formatNumber';

interface Props {
  name?: string;
  price?: number;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export default function MenuItem({
  name = '이름 없음',
  price = 0,
  imageUrl,
  isNew = false,
  isPopular = false,
}: Props) {
  return (
    <li className="flex gap-5 py-3">
      <div className="flex flex-1 flex-col gap-1">
        {(isNew || isPopular) && (
          <div className="flex items-center gap-1">
            {isNew && <Chip label="신메뉴" color="green" />}
            {isPopular && <Chip label="인기" color="red" />}
          </div>
        )}
        <h3 className="text-mb-4 line-clamp-2 text-gray-700">{name}</h3>
        <p className="text-mb-1 line-clamp-1 text-gray-800">
          {formatNumber(price)}원
        </p>
      </div>
      <div className="aspect-square h-[157px] rounded-2xl bg-gray-100">
        {imageUrl ? imageUrl : '이미지'}
      </div>
    </li>
  );
}
