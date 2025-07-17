import { ROUTES } from '../../constants/routes';
import ChervonLeftThickSvg from '@/assets/icons/ic_chervon_left_thick.svg?react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title: string;
  backPath?: string;
  onBackClick?: () => void;
}

/**
 * 상단 헤더 바를 렌더링하며, 뒤로 가기 버튼과 제목을 표시합니다.
 *
 * 뒤로 가기 버튼 클릭 시 `onBackClick` 콜백이 우선 호출되며, 이후 `backPath`가 있으면 해당 경로로 이동하고, 없으면 브라우저 히스토리를 이용해 뒤로 이동하거나, 이동할 수 없는 경우 루트 경로로 이동합니다.
 *
 * @param title - 헤더에 표시할 제목
 * @param backPath - (선택) 뒤로 가기 버튼 클릭 시 이동할 경로
 * @param onBackClick - (선택) 뒤로 가기 버튼 클릭 시 호출되는 콜백 함수
 *
 * @returns 헤더 컴포넌트 JSX
 */
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
