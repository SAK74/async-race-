import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import { GarageControll, GarageContainer } from '@/components/garage';
import { addAnimation } from '@/services/addAnimation';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';
import { Car } from '@/types';
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  createContext,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';

type GarageContextType = {
  // selectedCar?: Car;
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
  trackRef: ForwardedRef<HTMLDivElement>;
  trackWidth?: number;
} | null;

export const GarageContext = createContext<GarageContextType>(null);

// export const ControllContext

const Garage = function () {
  const { page } = useTypedSelector((state) => state.garage);
  const { data } = useGetCarsByPageQuery({ page });
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  const carRefs = useRef<{ [id: number]: HTMLDivElement }>({});
  const renderedData = !data
    ? []
    : data.data.map((car) => {
        // const carRef = useRef<HTMLDivElement | null>(null);
        const carRef = createRef<HTMLDivElement>();
        return { ...car, carRef };
      });

  const [trackWidth, setTrackWidth] = useState<number | undefined>();
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      console.log('Effect in garage!');
      renderedData.forEach((car) => {
        if (car.carRef.current) {
          carRefs.current[car.id] = car.carRef.current;
        }
      });
      console.log('Stop pushing to refs!');

      const handler = () => {
        setTrackWidth(trackRef.current?.clientWidth);
        console.log('In garage: ', { trackWidth: trackRef.current?.clientWidth });
      };
      handler();
      window.addEventListener('resize', handler);
      return () => {
        window.removeEventListener('resize', handler);
      };
    }
  }, [data]);

  const onStart = async () => {
    // console.log('Rendered:');
    const animations = Object.entries(carRefs.current).map(([id, carElement]) =>
      addAnimation(carElement, id, trackWidth)
    );

    console.log(animations);
    const winner = await Promise.any(animations.map((anim) => anim?.finished));

    console.log({ winner: winner.id });
  };

  const onReset = () => {
    const carAnimations = Object.values(carRefs.current).map((carElem) => carElem.getAnimations());
    console.log('Reset: ', carAnimations);
    carAnimations.forEach((animations) => {
      animations.forEach((animation) => {
        animation.cancel();
      });
    });
  };

  return (
    <main className="flex flex-col gap-4">
      <div>Garage ({data?.count ?? '?'})</div>
      <GarageControll
        selectedCar={selectedCar}
        selectCar={setSelectedCar}
        onStart={onStart}
        onReset={onReset}
      />
      <GarageContext.Provider value={{ selectCar: setSelectedCar, trackRef, trackWidth }}>
        <GarageContainer cars={renderedData} />
      </GarageContext.Provider>

      <Pagination page={page} pages={pages} />
    </main>
  );
};

export default Garage;
