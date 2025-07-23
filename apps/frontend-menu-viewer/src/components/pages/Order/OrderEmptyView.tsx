import { ROUTES } from '../../../constants/routes';
import { getStoreId } from '../../../utilities/getStoreId';
import CharacterEmptyImage from '@/assets/images/img_character_empty.svg?react';
import { useNavigate } from 'react-router';

export default function OrderEmptyView() {
  const navigate = useNavigate();

  return (
    <div className="wrapper flex-1 flex flex-col items-center justify-center">
      <div className="pb-10 flex flex-col items-center justify-center">
        <CharacterEmptyImage />
        <p className="text-mt-1 text-gray-900 mb-2.5 text-center">
          주문내역이
          <br />텅 비어있어요
        </p>
        <p className="mb-6  text-mb-4 text-gray-700">
          다양한 메뉴를 둘러보세요!
        </p>
        <button
          onClick={() =>
            navigate(ROUTES.STORES.DETAIL(getStoreId()), { replace: true })
          }
          className="rounded-2xl py-4 w-36 bg-gray-100 text-gray-700 text-mb-3"
        >
          메뉴 보러가기
        </button>
      </div>
    </div>
  );
}
