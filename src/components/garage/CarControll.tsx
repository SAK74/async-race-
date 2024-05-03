import { type FC, type RefObject, useContext, useEffect, useState } from 'react';
import { addAnimation, removeAnimation } from '@/services/animations';
import { GarageContext } from '@/pages/Garage';
import { useDeleteCarMutation, useDeleteWinnerMutation } from '@/store';
import { type Car } from '@/types';
import { type ConvertedColor, convert } from '@/utils/color-convertor';
import { Button } from '../ui';

const CarControll: FC<{
  car: Car;
  carRef: RefObject<HTMLDivElement>;
  id: number;
}> = function ({ car, carRef, id }) {
  const ctx = useContext(GarageContext);

  const [animation, setAnimation] = useState<Animation | null>(null);

  const onStart = async () => {
    if (!carRef.current) {
      return;
    }
    setAnimation(await addAnimation(carRef.current, id.toString()));
  };

  const onStop = async () => {
    if (!animation || !carRef.current) {
      return;
    }
    animation.pause();
    await removeAnimation(carRef.current, id);
    setAnimation(null);
  };

  const onSelect = () => {
    if (!ctx?.selectCar) {
      throw Error("SelectCar Fn doesn't provide in context!");
    }
    const hexColor = car.color.startsWith('#') ? car.color : convert(car.color as ConvertedColor);
    ctx.selectCar({ ...car, color: hexColor });
  };

  const [deleteCar, { isSuccess }] = useDeleteCarMutation();

  const [deleteWinner] = useDeleteWinnerMutation();
  const onDelete = () => {
    deleteCar({ id: car.id });
    deleteWinner({ id: car.id });
  };
  useEffect(() => {
    ctx?.selectCar(undefined);
  }, [isSuccess]); //eslint-disable-line

  return (
    <div className="grid grid-cols-2 items-center gap-y-2">
      <Button type="button" onClick={onSelect} className="text-xs p-0 row-start-1">
        Select
      </Button>
      <Button type="button" className="text-xs p-0 col-start-1" onClick={onDelete}>
        Remove
      </Button>
      <Button
        type="button"
        variant="start"
        className="text-xs p-1 row-start-1 justify-self-center size-4"
        onClick={onStart}
        disabled={!!animation || ctx?.isRace}
      />
      <Button
        type="button"
        variant="stop"
        className="text-xs p-1 justify-self-center size-4"
        onClick={onStop}
        disabled={!animation}
      />
    </div>
  );
};

export default CarControll;
