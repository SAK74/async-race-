import { addAnimation, removeAnimation } from '@/services/animations';
import { GarageContext } from '@/pages/Garage';
import { useDeleteCarMutation, useDeleteWinnerMutation } from '@/store';
import { type Car } from '@/types';
import { type ConvertedColor, convert } from '@/utils/color-convertor';
import { type FC, type RefObject, useContext, useRef } from 'react';
import { Button } from '../ui/button/Button';

const CarControll: FC<{
  car: Car;
  carRef: RefObject<HTMLDivElement>;
  id: number;
}> = ({ car, carRef, id }) => {
  const ctx = useContext(GarageContext);

  const animationRef = useRef<Animation | null>(null);

  const onStart = async () => {
    if (!carRef.current) {
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
    <div className="grid grid-cols-2 items-center gap-y-2">
      <Button type="button" onClick={onSelect} className="text-xs p-1 row-start-1">
        Select
      </Button>
      <Button type="button" className="text-xs p-1 col-start-1" onClick={onDelete}>
        Remove
      </Button>
      <Button
        type="button"
        variant="start"
        className="text-xs p-1 row-start-1 justify-self-center"
        onClick={onStart}
      />
      <Button
        type="button"
        variant="stop"
        className="text-xs p-1 justify-self-center"
        onClick={onStop}
      />
    </div>
  );
};

export default CarControll;
