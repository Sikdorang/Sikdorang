'use client';

import RecommendResultCard from '@/components/pages/recommend/RecommendResultCard';
import RecommendTableRow from '@/components/pages/recommend/RecommendTableRow';
import RepresentDrinkSelector from '@/components/pages/recommend/RepresentDrinkSelector';
import { IRecommendTableItem } from '@/types/model/menu';
import DorangImage1 from '@public/images/img_dorang_1.png';
import DorangImage2 from '@public/images/img_dorang_2.png';
import DorangImage3 from '@public/images/img_dorang_3.png';
import DorangImage4 from '@public/images/img_dorang_4.png';
import DorangImage5 from '@public/images/img_dorang_5.png';
import DorangImage6 from '@public/images/img_dorang_6.png';
import DorangImage7 from '@public/images/img_dorang_7.png';
import DorangImage8 from '@public/images/img_dorang_8.png';
import DorangImage9 from '@public/images/img_dorang_9.png';
import DorangImage10 from '@public/images/img_dorang_10.png';
import { useState } from 'react';

const recommedTypeList: IRecommendTableItem[] = [
  {
    id: 1,
    name: '1. 달콤한 입문자형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage1.src,
  },
  {
    id: 2,
    name: '2. 새콤한 청량형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신,아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요.',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage2.src,
  },
  {
    id: 3,
    name: '3. 드라이 라이트형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신,아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요.',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage3.src,
  },
  {
    id: 4,
    name: '4. 묵직한 쌉쌀형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage4.src,
  },
  {
    id: 5,
    name: '5. 스위트 크리미형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage5.src,
  },
  {
    id: 6,
    name: '6. 깔끔한 중도형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage6.src,
  },
  {
    id: 7,
    name: '7. 새콤 쌉쌀형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage7.src,
  },
  {
    id: 8,
    name: '8. 단짠 고수형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage8.src,
  },
  {
    id: 9,
    name: '9. 무게감 있는 순둥형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage9.src,
  },
  {
    id: 10,
    name: '10. 강맛 매니아형',
    description:
      '달콤한 맛을 좋아하고 도수는 낮은 게 좋은 당신, 아마도 술이 아직 낯설거나, 분위기를 즐기는 타입 같아요',
    result:
      '그런 당신께는 도수는 낮고, 맛은 확실한 하이볼이나 칵테일류를 추천드려요.',
    img: DorangImage10.src,
  },
];

export default function FullRecommendPage() {
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
            <RepresentDrinkSelector />
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
                    categories={['참이슬', '처음처럼', '진로']}
                    selectedOptions={[]}
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
