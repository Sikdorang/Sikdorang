import FlagSvg from '@/assets/icons/ic_flag.svg?react';
import { useEffect, useRef, useState } from 'react';

export default function RecommendationButton() {
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const delayBeforeShow = 800;

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolling) setScrolling(true);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setScrolling(false);
      }, delayBeforeShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`bg-main-500 text-main-900 flex h-14 items-center justify-center gap-4 overflow-hidden rounded-full transition-all duration-300 ${scrolling ? 'w-14' : 'pl-4 pr-6'}`}
    >
      <FlagSvg width={24} height={24} />
      <span
        className={`${scrolling ? 'hidden translate-x-12' : 'block translate-x-0'} text-lg font-medium leading-[150%] tracking-[-2%] transition-all duration-300`}
      >
        술 추천받기
      </span>
    </button>
  );
}
