import { FC } from 'react';
import CarIcon from '@/assets/car.svg?react';
import { CarControll } from '.';

const CarLine: FC<{ color: string; id: number; name: string }> = function ({ id, name, color }) {
  return (
    <div className="relative mt-8 flex items-center">
      <CarIcon fill={color} className="absolute w-28 bottom-4 left-16" />
      <span>
        {id}
        <CarControll />
      </span>
      <div className="border-b-2 border-t-2 border-dashed relative flex-grow -z-10 -skew-x-12">
        <span className="tracking-widest text-gray-400 ml-32 border-l-4 border-dashed pl-4">
          {name}
        </span>
        <div className="absolute right-28 bottom-0 text-2xl">🏁</div>
      </div>
    </div>
  );
};

export default CarLine;
