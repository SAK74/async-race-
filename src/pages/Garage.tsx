import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import Modal from '@/components/Modal';
import { GarageControll, GarageContainer } from '@/components/garage';
import Winner from '@/components/garage/Winner';
import { useGarageInit } from '@/components/garage/hooks/useGarageInit';
import { useGetCarsByPageQuery, useTypedDispatch, useTypedSelector, setGaragePage } from '@/store';
import { type Car } from '@/types';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type GarageContextType = {
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
} | null;

export const GarageContext = createContext<GarageContextType>(null);

const Garage = function () {
  const { page } = useTypedSelector((state) => state.garage);
  const { data } = useGetCarsByPageQuery({ page });
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  const { onMount, renderedData, showWinner, setShowWinner, onStart, onReset } =
    useGarageInit(data);

  useEffect(() => {
    onMount();
  }, [data]);

  const dispatch = useTypedDispatch();
  const onSetPage = (page: number) => {
    dispatch(setGaragePage(page));
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
