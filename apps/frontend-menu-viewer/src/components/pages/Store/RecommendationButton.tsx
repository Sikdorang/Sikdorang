import FlagSvg from '@/assets/icons/ic_flag.svg?react';
import { useEffect, useRef, useState } from 'react';

export default function RecommendationButton() {
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const DELAY_BEFORE_SHOW = 800;
  const SCROLL_THRESHOLD = 300;
  const expandedWidth = '10rem';
  const collapsedWidth = '3.5rem'; // w-14

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop >= SCROLL_THRESHOLD && !scrolling) {
        setScrolling(true);
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setScrolling(false);
      }, DELAY_BEFORE_SHOW);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolling]);

  return (
    <button
      className={`bg-main-500 text-main-900 h-14  overflow-hidden rounded-full transition-all duration-500`}
      style={{
        width: scrolling ? collapsedWidth : expandedWidth,
      }}
    >
      <div
        className={`pl-4 pr-6 transition-all duration-500 ${scrolling ? 'translate-x-[3.3rem]' : ' translate-x-0'} flex items-center justify-center gap-4`}
      >
        <FlagSvg width={24} height={24} className="shrink-0" />
        <span
          className={`whitespace-nowrap text-lg font-medium leading-[150%] tracking-[-2%]`}
        >
          술 추천받기
        </span>
      </div>
    </button>
  );
}
