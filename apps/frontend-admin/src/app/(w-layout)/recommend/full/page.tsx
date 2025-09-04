'use client';

import RecommendResultCard from '@/components/pages/recommend/RecommendResultCard';
import RecommendTableRow from '@/components/pages/recommend/RecommendTableRow';
import RepresentDrinkSelector from '@/components/pages/recommend/RepresentDrinkSelector';
import { recommedTypeList } from '@/constants/recommend';
import { useManageRecommend } from '@/hooks/useManageRecommend';
import { IRecommendTableItem } from '@/types/model/menu';
import { useState } from 'react';

export default function FullRecommendPage() {
  const {} = useManageRecommend();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IRecommendTableItem | null>(null);

  const openModal = (item: IRecommendTableItem) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8 border-t border-gray-100">
        <div className="flex w-full color-gray-700 text-mh-1 px-12">
          정밀 추천 모드
        </div>

        <div className="flex w-full px-12 py-4 gap-16">
          <div className="w-2/5">
            <RepresentDrinkSelector menus={[]} />
          </div>
          <div className="w-3/5">
            <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
              <thead className="text-mb-3 text-white rounded-lg border-b border-b-gray-400 bg-gray-900">
                <tr>
                  <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
                    유형
                  </th>
                  <th className="w-[12%] whitespace-nowrap px-5 py-5 text-center">
                    설명보기
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-center">
                    우리 매장 술 지정
                  </th>
                </tr>
              </thead>
              <tbody className="text-mb-3 rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-700">
                {recommedTypeList.map((item, idx) => (
                  <RecommendTableRow
                    key={item.id}
                    item={item}
                    isLastRow={idx === recommedTypeList.length - 1}
                    onDetailClick={() => openModal(item)}
                    onSetClick={() => {}}
                    menus={['참이슬', '처음처럼', '진로']}
                    selectedMenus={[]}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && modalData && (
        <RecommendResultCard
          title={'이런 타입이에요 !'}
          description={modalData.description}
          result={(modalData as any).result || ''}
          image={<img src={modalData.img} alt={modalData.name} />}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
