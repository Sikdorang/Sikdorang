import BellSvg from '@/assets/icons/ic_bell.svg?react';
import BillSvg from '@/assets/icons/ic_bill.svg?react';

import Divider from '@/components/common/Divider';
import CategoryMenuGroup from '@/components/pages/Home/CategoryMenuGroup';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import CategoryTabItem from '../components/pages/Home/CategoryTabItem';
import StoreInfoDropDown from '../components/pages/Home/StoreInfoDropDown';
import { useFetchMenusQuery } from '../hooks/useFetchMenusQuery';

export default function Home() {
  const { data, isLoading, isError } = useFetchMenusQuery();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedId(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);

      if (visible) {
        console.log(visible);
        const id = visible.target.getAttribute('data-id');
        if (id) setSelectedId(id);
      }
    };

    const options = {
      threshold: 0.6,
      rootMargin: '-116px 0px -160px 0px',
    };

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;

    Object.values(groupRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [data]);

  const handleTabSelect = (id: string) => {
    const el = groupRefs.current[id];
    if (!el || !observerRef.current) return;

    observerRef.current.disconnect();

    const y = el.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setSelectedId(id);

    setTimeout(() => {
      const observer = observerRef.current;
      if (!observer) return;

      Object.values(groupRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 700);
  };

  useEffect(() => {
    if (!selectedId) return;
    const el = tabRefs.current[selectedId];

    if (!el || !el.parentElement?.parentElement) return;
    const container = el.parentElement.parentElement;
    const offsetLeft = el.offsetLeft;
    container.scrollTo({
      left: offsetLeft - 20,
      behavior: 'smooth',
    });
  }, [selectedId]);

  if (isError) return <div>error</div>;
  if (isLoading) return <div>loading</div>;

  return (
    <div className="min-w-xs mx-auto w-full">
      <div className="sticky top-0 z-10 h-12 bg-white shadow-sm">
        <div className="wrapper flex w-full items-center justify-end">
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
      </div>

      <div className="wrapper pb-3 pt-5">
        <div className="mb-3">
          <p className="text-ml-2 text-gray-500">테이블 번호 01</p>
          <h1 className="text-mt-1 text-gray-900">지화자</h1>
        </div>
        <div>
          <StoreInfoDropDown
            items={[
              {
                label: '영업시간',
                value: '목 1600-100',
              },
              {
                label: '영업시간',
                value: '목 1600-100',
              },
              {
                label: '영업시간',
                value: '목 1600-100',
              },
            ]}
          />
        </div>
      </div>
      <Divider />

      {data && (
        <div className="scrollbar-hide sticky top-12 w-full overflow-x-auto bg-white py-3">
          <ul className="flex w-fit items-center gap-2 px-5 xl:mx-auto xl:w-full xl:max-w-5xl">
            {data.map(({ id, category, items }) => (
              <CategoryTabItem
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el;
                }}
                label={category}
                count={items.length ?? 0}
                selected={selectedId === id}
                onClick={() => handleTabSelect(id)}
              />
            ))}
          </ul>
        </div>
      )}
      {data && (
        <ul>
          {data.map(({ id, category, items }, idx) => (
            <div
              key={id}
              data-id={id}
              ref={(el) => {
                groupRefs.current[id] = el;
              }}
            >
              <CategoryMenuGroup category={category} items={items} />
              {idx < data.length - 1 && <Divider />}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
