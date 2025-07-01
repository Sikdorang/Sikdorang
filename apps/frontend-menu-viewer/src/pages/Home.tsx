import BellSvg from '@/assets/icons/ic_bell.svg?react';
import BillSvg from '@/assets/icons/ic_bill.svg?react';
import ChervonRightSvg from '@/assets/icons/ic_chervon_right.svg?react';

import Divider from '@/components/common/Divider';
import CategoryMenuGroup from '@/components/pages/Home/CategoryMenuGroup';
import CategoryTabList from '@/components/pages/Home/CategoryTabList';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const groups: ICategoryGroup[] = [
  {
    id: '1',
    category: '추천 메뉴',
    items: [
      {
        id: '1',
        name: '참소라 무침',
        price: 25000,
        isNew: true,
        isPopular: true,
      },
      {
        id: '2',
        name: '오징어 숙회',
        price: 18000,
        isNew: false,
        isPopular: true,
      },
      {
        id: '3',
        name: '골뱅이 무침',
        price: 22000,
        isNew: true,
        isPopular: false,
      },
    ],
  },
  {
    id: '2',
    category: '식사류',
    items: [
      {
        id: '4',
        name: '김치찌개',
        price: 9000,
        isNew: false,
        isPopular: false,
      },
      { id: '5', name: '된장찌개', price: 9000, isNew: false, isPopular: true },
      {
        id: '6',
        name: '제육볶음',
        price: 12000,
        isNew: true,
        isPopular: false,
      },
      { id: '7', name: '비빔밥', price: 10000, isNew: false, isPopular: false },
    ],
  },
  {
    id: '3',
    category: '주류',
    items: [
      { id: '8', name: '소주', price: 5000, isNew: false, isPopular: true },
      { id: '9', name: '맥주', price: 6000, isNew: false, isPopular: true },
      { id: '10', name: '청하', price: 7000, isNew: true, isPopular: false },
    ],
  },
  {
    id: '4',
    category: '사이드',
    items: [
      {
        id: '11',
        name: '감자튀김',
        price: 8000,
        isNew: false,
        isPopular: false,
      },
      { id: '12', name: '계란찜', price: 7000, isNew: true, isPopular: false },
    ],
  },
  {
    id: '5',
    category: '이름이 매우 긴 카테고리 예시입니다',
    items: [
      {
        id: '13',
        name: '이름이 매우 긴 메뉴 예시로서 한글이 길게 들어갑니다',
        price: 123456789,
        isNew: true,
        isPopular: true,
      },
    ],
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState(groups[0].id);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        const id = visible.target.getAttribute('data-id');
        if (id) setSelectedId(id);
      }
    };

    const options = {
      threshold: 0.6,
      rootMargin: '0px 0px -40% 0px',
    };

    const observer = new IntersectionObserver(callback, options);

    Object.values(groupRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabSelect = (id: string) => {
    const el = groupRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedId(id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs border">
      <div className="wrapper sticky top-0 z-10 flex h-12 items-center justify-end bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/call-staff">
            <button className="text-mb-5 flex flex-wrap items-center text-gray-700">
              <BellSvg className="text-gray-700" />
              <span> 호출하기</span>
            </button>
          </Link>
          <Link to="/orders">
            <button className="text-mb-5 flex flex-wrap items-center text-gray-700">
              <BillSvg className="text-gray-700" />
              <span> 주문내역</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="wrapper pb-3 pt-5">
        <div className="mb-3">
          <p className="text-ml-2 text-gray-500">테이블 번호 01</p>
          <h1 className="text-mt-1 text-gray-900">지화자</h1>
        </div>
        <div>
          <Link to={`/store-info/${123}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-mb-3 text-gray-700">매장 안내·서비스</h2>
              <ChervonRightSvg className="text-gray-700" />
            </div>
          </Link>
          <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="aspect-square w-6 rounded-full bg-white"></div>
              <p className="flex flex-wrap items-center gap-1">
                <span className="text-mb-5 text-gray-700">영업시간</span>
                <span className="text-mb-6 text-gray-700">목 1600-100</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="aspect-square w-6 rounded-full bg-white"></div>
              <p className="flex flex-wrap items-center gap-1">
                <span className="text-mb-5 text-gray-700">영업시간</span>
                <span className="text-mb-6 text-gray-700">목 1600-100</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="aspect-square w-6 rounded-full bg-white"></div>
              <p className="flex flex-wrap items-center gap-1">
                <span className="text-mb-5 text-gray-700">영업시간</span>
                <span className="text-mb-6 text-gray-700">목 1600-100</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <CategoryTabList
        groups={groups}
        selectedId={selectedId}
        onSelect={handleTabSelect}
      />
      <ul>
        {groups.map(({ id, category, items }, idx) => (
          <div
            key={id}
            data-id={id}
            ref={(el) => {
              groupRefs.current[id] = el;
            }}
          >
            <CategoryMenuGroup category={category} items={items} />
            {idx < groups.length - 1 && <Divider />}
          </div>
        ))}
      </ul>
    </div>
  );
}
