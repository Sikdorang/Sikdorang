import ChervonLeftThickSvg from '@/assets/icons/ic_chervon_left_thick.svg?react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

  return (
    <div className="sticky top-0 z-20 h-14 bg-white">
      <div className="wrapper flex h-full w-full items-center">
        {canGoBack && (
          <ChervonLeftThickSvg
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        )}
        <h1 className="text-mb-1 text-gray-800">{title}</h1>
      </div>
    </div>
  );
}
