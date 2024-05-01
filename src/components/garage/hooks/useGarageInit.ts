import { type QueryResponse } from '@/store/apiSlice';
import { type Car } from '@/types';
import { createRef, useMemo, useRef, useState } from 'react';
import { useAddwinner } from './useAddwinner';
import { addAnimation, addBlobAnimation } from '@/services/animations';
import { startRace } from '@/services/engineApi';

export const useGarageInit = (data?: QueryResponse<Car>) => {
  const carRefs = useRef<{ [id: number]: HTMLDivElement }>({});

  const renderedData = useMemo(
    () =>
      !data
        ? []
        : data.data.map((car) => {
            const carRef = createRef<HTMLDivElement>();
            return { ...car, carRef };
          }),
    [data]
  );

  const onMount = () => {
    if (data) {
      carRefs.current = {};
      renderedData.forEach((car) => {
        if (car.carRef.current) {
          carRefs.current[car.id] = car.carRef.current;
        }
      });
    }
  };

  const [showWinner, setShowWinner] = useState<false | { name: string; time: number }>(false);

  const addWinner = useAddwinner();

  const onStart = async () => {
    const cars = Object.entries(carRefs.current);
    const animations = cars.map(([id, carElement]) => addAnimation(carElement, id));
    animations.forEach(async (animPromise) => {
      const animation = await animPromise;
      try {
        await startRace(Number(animation.id));
      } catch {
        animation.pause();
        addBlobAnimation(carRefs.current[Number(animation.id)].lastElementChild);
      }
    });

    const { currentTime, id } = await Promise.any(
      animations.map(async (anim) => (await anim).finished)
    );
    if (!currentTime) {
      throw Error('Time of animation missing...');
    }
    const winner = data?.data.find((car) => car.id.toString() === id);
    if (winner) {
      const time = Math.round(currentTime as number) / 1000;
      setShowWinner({ name: winner.name, time });
      addWinner({ id: winner.id, time });
    }
  };

  const onReset = () => {
    const cars = Object.values(carRefs.current);
    cars.forEach((car) => {
      car.lastElementChild?.getAnimations().forEach((animation) => {
        animation.cancel();
      });
      car.getAnimations().forEach((animation) => {
        animation.cancel();
      });
    });
  };

  return {
    renderedData,
    onMount,
    onReset,
    showWinner,
    setShowWinner,
    onStart,
  };
};
