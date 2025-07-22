import CharacterEmptyImage from '@/assets/images/img_character_empty.svg?react';
import { ROUTES } from '@/constants/routes';
import { getStoreId } from '@/utilities/getStoreId';
import { useNavigate } from 'react-router';

export default function ErrorView() {
  const navigate = useNavigate();

  return (
    <div className="wrapper flex-1 flex flex-col items-center justify-center">
      <div className="pb-10 flex flex-col items-center justify-center">
        <CharacterEmptyImage />
        <p className="text-mt-1 text-gray-900 mb-2.5 text-center">
          앗 !
          <br />
          오류가 발생했어요
        </p>
        <p className="mb-6  text-mb-4 text-gray-700">
          다시 시작해주세요
          <br /> ‘닫기’를 누르면 이전 페이지로 이동합니다
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
