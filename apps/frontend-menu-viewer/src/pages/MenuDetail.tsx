import { useParams } from 'react-router';
import BaseButton from '../components/common/BaseButton';
import Chip from '../components/common/Chip';
import OptionGroup from '../components/pages/MenuDetail/OptionGroup';
import { useFetchMenuDetailQuery } from '../hooks/useFetchMenuDetailQuery';
import formatNumber from '../utils/formatNumber';

export default function MenuDetail() {
  const { menuId } = useParams<{ menuId: string }>();
  if (!menuId) return <div>error</div>;

  const { data, isLoading, isError } = useFetchMenuDetailQuery(menuId);

  if (isLoading) return <div>loading</div>;
  if (isError || !data) return <div>error</div>;

  return (
    <div className="min-w-xs mx-auto w-full">
      <div className="sticky top-0 z-10 h-12 bg-white shadow-sm">
        <div className="wrapper flex w-full items-center justify-end"></div>
      </div>
      <div className="wrapper">
        <div className="mb-3 mt-6 flex w-full flex-col items-center">
          <div className="relative mb-1 aspect-square w-full max-w-md rounded-2xl bg-gray-100">
            <div className="text-mb-4 text-gray-400">이미지 영역</div>
            <div className="text-mc-1 absolute right-2.5 top-2.5 rounded-full bg-gray-900/40 px-2 py-1 text-white">
              1/5
            </div>
          </div>

          <div className="my-2.5 flex items-center justify-center space-x-1.5">
            <div className="h-2 w-2 rounded-full bg-gray-800"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-1">
          {data.isNew && <Chip label="신메뉴" color="green" />}
          {data.isPopular && <Chip label="인기" color="red" />}
        </div>
        <h1 className="text-mb-3 text-gray-700">{data?.name}</h1>
        <p className="text-mb-4 mb-3 text-gray-700">{data.description}</p>
        <div className="mb-6 flex items-center justify-between">
          <div className="text-mb-1 text-gray-800">
            {formatNumber(data.price ?? 0)}원
          </div>
          <div className="flex gap-1 rounded-md bg-gray-200 p-0.5">
            <button className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center text-gray-400">
              -
            </button>
            <span className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center rounded-md bg-white text-gray-800">
              1
            </span>
            <button className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center text-gray-400">
              +
            </button>
          </div>
        </div>
      </div>
      {data.optionGroups.map((group) => (
        <OptionGroup key={group.id} group={group} />
      ))}
      <div className="h-48"></div>
      <div className="wrapper fixed bottom-0 left-0 right-0 w-full bg-gradient-to-t from-white to-white/0 pb-7 pt-2">
        <BaseButton>총 25,000원 · 담기</BaseButton>
      </div>
    </div>
  );
}
