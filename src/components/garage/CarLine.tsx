import { type FC, type RefObject, memo } from 'react';
import { CarControll } from '.';
import Track from './Track';

const CarLine: FC<{
  color: string;
  id: number;
  name: string;
  carRef: RefObject<HTMLDivElement>;
}> = function ({ id, name, color, carRef }) {
  return (
    <div className="relative mt-4 mb-1 flex items-center">
      <CarControll car={{ id, name, color }} carRef={carRef} id={id} />
      <Track name={name} className="" color={color} carRef={carRef} />
    </div>
  );
};

export default memo(CarLine);
