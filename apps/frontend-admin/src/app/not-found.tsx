'use client';

import loadingAnimation from '@/styles/animations/dorang_defeat.json';
import Player from 'lottie-react';

export default function NotFound() {
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
        <div className="text-mobile-head-l-semibold text-center">
          찾으시는 페이지가
          <br />
          없어요
        </div>
        <div className="text-mobile-body-s-regular color-gray-700 items-center justify-center text-center">
          잘못된 접근이거나 요청하신 페이지를
          <br />
          찾을 수 없습니다
        </div>
      </div>
    </div>
  );
}
