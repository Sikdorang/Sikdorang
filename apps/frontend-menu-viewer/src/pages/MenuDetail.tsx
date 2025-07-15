import ChervonLeftThickSvg from '@/assets/icons/ic_chervon_left_thick.svg?react';
import { useParams } from 'react-router';
import BaseButton from '../components/common/BaseButton';
import Chip from '../components/common/Chip';
import Carousel from '../components/pages/MenuDetail/Carousel';
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
      <div className="sticky top-0 z-20 h-14 bg-white">
        <div className="wrapper flex h-full w-full items-center">
          <ChervonLeftThickSvg />
          <h1 className="text-mb-1 text-gray-800">메뉴보기</h1>
        </div>
      </div>
      <div className="wrapper">
        <div className="mb-3 mt-6">
          <Carousel imgUrls={data.imageUrls} />
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
