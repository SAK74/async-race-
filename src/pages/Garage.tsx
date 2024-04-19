import { Pagination } from '@/components/Pagination';
import { Controll } from '@/components/garage/Controll';
import { GarageContainer } from '@/components/garage/GarageContainer';

export const Garage = () => {
  return (
    <main className="flex flex-col">
      <div>Garage</div>
      <Controll />
      <GarageContainer />
      <Pagination />
    </main>
  );
};
