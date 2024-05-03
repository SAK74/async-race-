import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import Modal from '@/components/Modal';
import { GarageControll, GarageContainer } from '@/components/garage';
import Winner from '@/components/garage/Winner';
import { useGarageInit } from '@/components/garage/hooks';
import { useGetCarsByPageQuery, useTypedDispatch, useTypedSelector, setGaragePage } from '@/store';
import { type Car } from '@/types';

type GarageContextType = {
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
  isRace: boolean;
} | null;

export const GarageContext = createContext<GarageContextType>(null);

const Garage = function () {
  const { page } = useTypedSelector((state) => state.garage);
  const { data } = useGetCarsByPageQuery({ page });
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  const { onMount, renderedData, showWinner, setShowWinner, onStart, onReset, isRace } =
    useGarageInit(data);

  useEffect(() => {
    onMount();
  }, [data, onMount]);

  const dispatch = useTypedDispatch();
  const onSetPage = (_page: number) => {
    dispatch(setGaragePage(_page));
  };

  return (
    <main className="flex flex-col gap-4">
      {showWinner && (
        <Modal
          onClose={() => {
            setShowWinner(false);
          }}
        >
          <Winner name={showWinner.name} time={showWinner.time} />
        </Modal>
      )}
      <h1 className="text-3xl ml-8">Garage ({data?.count ?? '?'})</h1>
      {/* eslint-disable-next-line */}
      <GarageContext.Provider value={{ selectCar: setSelectedCar, isRace }}>
        <GarageControll
          selectedCar={selectedCar}
          selectCar={setSelectedCar}
          onStart={onStart}
          onReset={onReset}
        />
        <GarageContainer cars={renderedData} />
      </GarageContext.Provider>
      <Pagination page={page} pages={pages} onSetPage={onSetPage} />
    </main>
  );
};

export default Garage;
