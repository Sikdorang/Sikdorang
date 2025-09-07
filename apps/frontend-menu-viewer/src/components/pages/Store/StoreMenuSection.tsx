import CategoryTabList from '@/components/pages/Store/CategoryTabList';
import MenuGroupList from '@/components/pages/Store/MenuGroupList';
import RecommendationButton from '@/components/pages/Store/RecommendationButton';
import StoreOrderButton from '@/components/pages/Store/StoreOrderButton';
import { ROUTES } from '@/constants/routes';
import { useFetchMenusQuery } from '@/hooks/useFetchMenusQuery';
import { useCartStore } from '@/stores/useCartStore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function StoreMenuSection() {
  const navigate = useNavigate();
  const { data } = useFetchMenusQuery();
  const { items, getTotalPrice, getSelectedItemCount } = useCartStore();
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

  return (
    <>
      {data && (
        <>
          <CategoryTabList
            data={data}
            selectedId={selectedId}
            onTabClick={handleTabSelect}
            tabRefs={tabRefs}
          />
          <MenuGroupList data={data} groupRefs={groupRefs} />
        </>
      )}
      <div
        className={`${items.length > 0 ? 'bottom-27' : 'bottom-11'} mx-auto fixed w-full z-10 transition-all duration-300`}
      >
        <div className="wrapper flex justify-end">
          <RecommendationButton />
        </div>
      </div>

      {items.length > 0 && (
        <StoreOrderButton
          totalPrice={getTotalPrice()}
          itemCount={getSelectedItemCount()}
          onClick={() => navigate(ROUTES.CARTS)}
        />
      )}
    </>
  );
}
