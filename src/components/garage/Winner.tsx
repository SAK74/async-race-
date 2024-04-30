import { type FC, useEffect } from 'react';
import tadam from '@/assets/ta-dam.wav';

const Winner: FC<{ name: string; time: number }> = ({ name, time }) => {
  useEffect(() => {
    const sound = new Audio(tadam);
    sound.volume = 0.2;
    sound.play();
  }, []);
  return (
    <div className="text-yellow-400 text-2xl font-semibold p-4 flex flex-col items-center gap-6">
      <div>Winner: {name}</div>
      <div>With time: {time}</div>
      <div className="text-5xl">&#127942;</div>
    </div>
  );
};

export default Winner;
