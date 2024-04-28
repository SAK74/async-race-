import { FC, RefObject, useContext } from 'react';
import { CarControll } from '.';
import CarIcon from './CarIcon';
import Track from './Track';
import { GarageContext } from '@/pages/Garage';

const CarLine: FC<{
  color: string;
  id: number;
  name: string;
  carRef: RefObject<HTMLDivElement>;
}> = ({ id, name, color, carRef }) => {
  const ctx = useContext(GarageContext);
  return (
    <div className="relative mt-8 flex items-center">
      <CarIcon fill={color} className="absolute w-28 bottom-4 left-24" ref={carRef} />
      <CarControll car={{ id, name, color }} carRef={carRef} id={id} />
      <Track name={name} className="" ref={ctx?.trackRef} />
    </div>
  );
};

export default CarLine;
