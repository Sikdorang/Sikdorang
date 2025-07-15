import errorAnimation from '@/styles/animations/dorang_error.json';
import Player from 'lottie-react';

const ErrorAnimation = () => (
  <div style={{ width: 212, height: 255 }}>
    <Player
      autoplay
      loop
      animationData={errorAnimation}
      style={{ width: '100%', height: '100%' }}
    />
  </div>
);

export default ErrorAnimation;
