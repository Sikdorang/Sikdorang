'use client';

import RecommendTableRow from '@/components/pages/recommend/RecommendTableRow';
import { IMenuTableItem } from '@/types/model/menu';
import RecommendScreen from '@public/images/img_recommend_screen.png';
import Image from 'next/image';

const menuList: IMenuTableItem[] = [
  {
    id: 1,
    name: '참소라 무침',
    price: 25000,
    category: '안주',
    status: '판매 중',
    checked: false,
    order: '1',
  },
  {
    id: 2,
    name: '아롱사태 수육',
    price: 25000,
    category: '안주',
    status: '품절',
    checked: true,
    order: '1',
  },
  {
    id: 3,
    name: '앞다리살 수육',
    price: 25000,
    category: '안주',
    status: '숨김',
    checked: true,
    order: '1',
  },
];

export default function FullRecommendPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
        <div className="flex w-full color-gray-700 text-desktop-title-xl-semibold px-12">
          정밀 추천 모드
        </div>

        <div className="flex w-full px-12 py-4 gap-16">
          <div className="w-3/4">
            <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
              <thead className="text-mobile-body-m-semibold text-w rounded-lg border-b border-b-gray-400 bg-gray-700">
                <tr>
                  <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
                    유형
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                    설명보기
                  </th>
                  <th className="w-[12%] whitespace-nowrap px-5 py-5 text-left">
                    우리 매장 술 지정
                  </th>
                </tr>
              </thead>
              <tbody className="text-mobile-body-m-regular rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-600">
                {menuList.map((item, idx) => (
                  <RecommendTableRow
                    key={item.id}
                    item={item}
                    isLastRow={idx === menuList.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/4">
            <Image src={RecommendScreen} alt="recommend" />
          </div>
        </div>
      </div>
    </div>
  );
}
