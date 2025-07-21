import { ROUTES } from '../../../constants/routes';
import Chip from '@/components/common/Chip';
import { formatNumber } from '@/utilities/format';
import { Link } from 'react-router';

interface Props extends IMenuListItem {}

export default function MenuItem({
  id,
  name = '이름 없음',
  price = 0,
  imgUrl,
  isNew = false,
  isPopular = false,
}: Props) {
  return (
    <Link to={ROUTES.MENUS.DETAIL(id)}>
      <li className="flex gap-5 py-3 md:flex-col-reverse md:gap-2 md:py-0">
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
        <div className="aspect-square h-[157px] overflow-hidden rounded-2xl bg-gray-100 sm:h-[216px] md:h-auto md:w-full">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="메뉴 이미지"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>
      </li>
    </Link>
  );
}
