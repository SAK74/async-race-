import { type FC, useEffect } from 'react';
import tadam from '@/assets/ta-dam.wav';
import { useTypedSelector } from '@/store';

const sound = new Audio(tadam);
sound.volume = 0.2;

const Winner: FC<{ name: string; time: number }> = function ({ name, time }) {
  const { isSound } = useTypedSelector((state) => state.garage);
  useEffect(() => {
    if (isSound) {
      sound.play();
    }
  }, [isSound]);
  return (
    <div className="text-yellow-400 text-2xl font-semibold p-4 flex flex-col items-center gap-6">
      <div>Winner: {name}</div>
      <div>With time: {time}</div>
      <div className="text-5xl">&#127942;</div>
    </div>
  );
};

export default Winner;
