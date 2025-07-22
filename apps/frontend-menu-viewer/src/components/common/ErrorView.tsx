import ErrorAnimation from '@/assets/lotties/lottie_error.json';
import Lottie from 'lottie-react';

export default function ErrorView() {
  return (
    <div className="wrapper h-full flex-1 flex flex-col items-center justify-center">
      <div className="pb-10 flex flex-col items-center justify-center">
        <Lottie animationData={ErrorAnimation} loop={false} />
        <p className="text-mt-1 text-gray-900 mb-2.5 text-center">
          앗 !
          <br />
          오류가 발생했어요
        </p>
        <p className="mb-6  text-mb-4 text-gray-700">다시 시작해주세요</p>
      </div>
    </div>
  );
}
