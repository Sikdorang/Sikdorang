'use client';

import loadingAnimation from '@/styles/animations/dorang_crush.json';
import Player from 'lottie-react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
      <div
        className="flex items-center justify-center"
        style={{ width: 150, height: 150 }}
      >
        <Player
          autoplay
          loop={false}
          animationData={loadingAnimation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="flex flex-col items-center justify-center color-gray-900 gap-2">
        <div className="text-mt-1 text-center">
          앗 !
          <br />
          오류가 발생했어요
        </div>
        <div className="text-mb-4 color-gray-700 items-center justify-center text-center">
          다시 시작해주세요
          <br />
          ‘닫기’를 누르면 이전 페이지로 이동합니다
        </div>
      </div>
    </div>
  );
}
