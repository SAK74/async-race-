import { GarageContext } from '@/pages/Garage';
import { useDeleteCarMutation, useDeleteWinnerMutation } from '@/store/apiSlice';
import { Car } from '@/types';
import { FC, useContext, useRef } from 'react';

const CarControll: FC<{
  car: Car;
  carRef: HTMLDivElement | null;
  trackWidth?: number;
  trackRef: HTMLDivElement | null;
}> = function ({ car, carRef, trackWidth }) {
  const animationRef = useRef<Animation | null>(null);

  const onStart = () => {
    if (!carRef || !trackWidth) {
      return;
    }
    const carWidth = carRef.clientWidth;
    animationRef.current = carRef.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${trackWidth - carWidth}px)` }],
      {
        duration: 2000,
        fill: 'forwards',
      }
    );
  };

  const onStop = () => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current.cancel();
  };

  const ctx = useContext(GarageContext);
  const onSelect = () => {
    if (!ctx?.selectCar) {
      throw Error("SelectCar Fn doesn't provide in context!");
    }
    ctx.selectCar(car);
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
