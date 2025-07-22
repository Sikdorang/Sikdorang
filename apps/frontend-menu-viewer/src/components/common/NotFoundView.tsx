import NotFoundAnimation from '@/assets/lotties/lottie_not_found.json';
import Lottie from 'lottie-react';

export default function NotFoundView() {
  return (
    <div className="w-full h-full wrapper flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <Lottie animationData={NotFoundAnimation} loop={false} />
        </div>
        <p className="text-mt-1 text-gray-900 mb-2.5 text-center">
          찾으시는 페이지가
          <br />
          없어요
        </p>
        <p className="mb-6 text-mb-4 text-gray-700 text-center">
          잘못된 접근이거나 요청하신 페이지를
          <br /> 찾을 수 없습니다
        </p>
      </div>
    </div>
  );
}
