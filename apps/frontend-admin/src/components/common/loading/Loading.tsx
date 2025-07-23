import loadingAnimation from '@/styles/animations/dorang_walking.json';
import Player from 'lottie-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 gap-2">
      <div
        className="flex items-center justify-center"
        style={{ width: 150, height: 150 }}
      >
        <Player
          autoplay
          loop
          animationData={loadingAnimation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-w gap2">
        <div className="text-mobile-head-l-semibold text-center">
          잠시만
          <br />
          기다려주세요!
        </div>
        <div className="text-mobile-body-s-regular">거의 다 완료 했어요!</div>
      </div>
    </div>
  );
}
