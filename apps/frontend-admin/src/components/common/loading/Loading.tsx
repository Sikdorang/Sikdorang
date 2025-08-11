import loadingAnimation from '@/styles/animations/dorang_walking.json';
import Player, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

export default function Loading() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(6);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2">
      <div
        className="flex items-center justify-center"
        style={{ width: 150, height: 150 }}
      >
        <Player
          lottieRef={lottieRef}
          autoplay
          loop
          animationData={loadingAnimation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-w gap-2">
        <div className="text-mt-1 text-center">
          잠시만
          <br />
          기다려주세요!
        </div>
        <div className="text-mb-4">거의 다 완료 했어요!</div>
      </div>
    </div>
  );
}
