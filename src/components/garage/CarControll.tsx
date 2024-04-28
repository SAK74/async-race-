import { addAnimation, removeAnimation } from '@/services/animations';
import { GarageContext } from '@/pages/Garage';
import { useDeleteCarMutation, useDeleteWinnerMutation } from '@/store/apiSlice';
import { Car } from '@/types';
import { type ConvertedColor, convert } from '@/utils/color-convertor';
import { FC, RefObject, useContext, useRef } from 'react';

const CarControll: FC<{
  car: Car;
  carRef: RefObject<HTMLDivElement>;
  id: number;
}> = ({ car, carRef, id }) => {
  const ctx = useContext(GarageContext);

  const animationRef = useRef<Animation | null>(null);

  const onStart = async () => {
    // console.log('Start');

    if (!carRef.current) {
      console.log({ carRef: carRef.current });
      return;
    }
    animationRef.current = await addAnimation(carRef.current, id.toString());
  };

  const onStop = async () => {
    if (!animationRef.current || !carRef.current) {
      return;
    }
    animationRef.current.pause();
    await removeAnimation(carRef.current, id);
  };

  const onSelect = () => {
    if (!ctx?.selectCar) {
      throw Error("SelectCar Fn doesn't provide in context!");
    }
    const hexColor = car.color.startsWith('#') ? car.color : convert(car.color as ConvertedColor);
    ctx.selectCar({ ...car, color: hexColor });
  };

  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const onDelete = () => {
    deleteCar({ id: car.id });
    deleteWinner({ id: car.id });
  };
  return (
    <div>
      <span className="inline-flex flex-col">
        <button type="button" onClick={onSelect} className="text-xs p-1">
          Select
        </button>
        <button type="button" className="text-xs p-1" onClick={onDelete}>
          Remove
        </button>
      </span>
      <span className="inline-flex flex-col">
        <button type="button" className="text-xs p-1" onClick={onStart}>
          Start
        </button>
        <button type="button" className="text-xs p-1" onClick={onStop}>
          Stop
        </button>
      </span>
    </div>
  );
};

export default CarControll;
