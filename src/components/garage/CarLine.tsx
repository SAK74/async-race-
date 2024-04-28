import { FC, RefObject, memo } from 'react';
import { CarControll } from '.';
// import CarIcon from './CarIcon';
import Track from './Track';

const CarLine: FC<{
  color: string;
  id: number;
  name: string;
  carRef: RefObject<HTMLDivElement>;
}> = ({ id, name, color, carRef }) => {
  return (
    <div className="relative mt-8 flex items-center">
      <CarControll car={{ id, name, color }} carRef={carRef} id={id} />
      <Track name={name} className="" color={color} carRef={carRef} />
    </div>
  );
};

export default memo(CarLine);
