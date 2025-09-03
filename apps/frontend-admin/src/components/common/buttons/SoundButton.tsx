import CtaButton from './CtaButton';
import { useRef } from 'react';

function SoundButton() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();

    }
  };
  
  return (
    <div>
      <CtaButton
        width="fit"
        text="식도랑 주제가 들어보기"
        onClick={playSound}
      />
      <audio ref={audioRef} src="/sounds/bgm_sikdorang.mp3" preload="auto" />
    </div>
  );
}

export default SoundButton;
