import { useRef } from 'react';

function SoundButton() {
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={playSound}>소리 재생하기</button>
      <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
    </div>
  );
}

export default SoundButton;
