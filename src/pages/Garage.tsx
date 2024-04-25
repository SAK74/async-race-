import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import { GarageControll, GarageContainer } from '@/components/garage';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';
import { Car } from '@/types';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type GarageContextType = {
  selectedCar?: Car;
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
} | null;

export const GarageContext = createContext<GarageContextType>(null);

const Garage = function () {
  const { page } = useTypedSelector((state) => state.garage);
  const { data } = useGetCarsByPageQuery({ page });
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);
  return (
    <main className="flex flex-col gap-4">
      <div>Garage ({data?.count ?? '?'})</div>
      <GarageContext.Provider value={{ selectCar: setSelectedCar, selectedCar }}>
        <GarageControll />
        <GarageContainer />
      </GarageContext.Provider>

      <Pagination page={page} pages={pages} />
    </main>
  );
};

export default Garage;
