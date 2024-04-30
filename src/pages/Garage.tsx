import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import Modal from '@/components/Modal';
import { GarageControll, GarageContainer } from '@/components/garage';
import Winner from '@/components/garage/Winner';
import { useAddwinner } from '@/components/garage/hooks/useAddwinner';
import { addAnimation, addBlobAnimation } from '@/services/animations';
import { startRace } from '@/services/engineApi';
import { useGetCarsByPageQuery, useTypedDispatch, useTypedSelector } from '@/store';
import { setPage } from '@/store/garageSlice';
import { Car } from '@/types';
import {
  Dispatch,
  SetStateAction,
  createContext,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type GarageContextType = {
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
} | null;

export const GarageContext = createContext<GarageContextType>(null);

const Garage = function () {
  const { page } = useTypedSelector((state) => state.garage);
  const { data } = useGetCarsByPageQuery({ page });
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);
  const [showWinner, setShowWinner] = useState<false | { name: string; time: number }>(false); // to change to false

  const carRefs = useRef<{ [id: number]: HTMLDivElement }>({});
  const renderedData = useMemo(
    () =>
      !data
        ? []
        : data.data.map((car) => {
            // const carRef = useRef<HTMLDivElement | null>(null);
            const carRef = createRef<HTMLDivElement>();
            return { ...car, carRef };
          }),
    [data]
  );

  useEffect(() => {
    if (data) {
      carRefs.current = {};
      renderedData.forEach((car) => {
        if (car.carRef.current) {
          carRefs.current[car.id] = car.carRef.current;
        }
      });
    }
  }, [data]);

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
    // console.log({ winner: { ...winner, time: Math.round(currentTime as number) / 1000 } });
  };

  const onReset = () => {
    const cars = Object.values(carRefs.current);
    cars.forEach((car) => {
      // console.log(car.lastElementChild?.getAnimations());

      car.lastElementChild?.getAnimations().forEach((animation) => {
        animation.cancel();
      });
      car.getAnimations().forEach((animation) => {
        animation.cancel();
      });
    });
  };
  const dispatch = useTypedDispatch();
  const onSetPage = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <main className="flex flex-col gap-4">
      {showWinner && (
        <Modal
          onClose={() => {
            setShowWinner(false);
          }}
        >
          <Winner {...showWinner} />
        </Modal>
      )}
      <div>Garage ({data?.count ?? '?'})</div>
      <GarageControll
        selectedCar={selectedCar}
        selectCar={setSelectedCar}
        onStart={onStart}
        onReset={onReset}
      />

      <GarageContext.Provider value={{ selectCar: setSelectedCar }}>
        <GarageContainer cars={renderedData} />
      </GarageContext.Provider>

      <Pagination page={page} pages={pages} onSetPage={onSetPage} />
    </main>
  );
};

export default Garage;
