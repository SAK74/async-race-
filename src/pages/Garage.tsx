import { Pagination } from '@/components/Pagination';
import { GarageControll } from '@/components/garage/GarageControll';
import { GarageContainer } from '@/components/garage/GarageContainer';

export const Garage = () => {
  return (
    <main className="flex flex-col gap-4">
      <div>Garage</div>
      <GarageControll />
      <GarageContainer />
      <Pagination />
    </main>
  );
};
