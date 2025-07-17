import { ROUTES } from '../../constants/routes';
import ChervonLeftThickSvg from '@/assets/icons/ic_chervon_left_thick.svg?react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
  backPath?: string;
  onBackClick?: () => void;
}

export default function Header({ title, backPath, onBackClick }: HeaderProps) {
  const navigate = useNavigate();
  const canGoBack = window.history.length > 1;

  const handleBack = () => {
    onBackClick?.();

    if (backPath) {
      navigate(backPath, { replace: true });
    } else if (canGoBack) {
      navigate(-1);
    } else {
      navigate(ROUTES.ROOT, { replace: true });
    }
  };
  return (
    <div className="sticky top-0 z-20 h-14 bg-white">
      <div className="wrapper flex h-full w-full items-center">
        {(canGoBack || backPath) && (
          <ChervonLeftThickSvg
            onClick={handleBack}
            className="cursor-pointer"
          />
        )}
        <h1 className="text-mb-1 text-gray-800">{title}</h1>
      </div>
    </div>
  );
}
