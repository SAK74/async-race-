import { Pagination } from '@/components';
import { GarageControll, GarageContainer } from '@/components/garage';

const Garage = function () {
  return (
    <main className="flex flex-col gap-4">
      <div>Garage</div>
      <GarageControll />
      <GarageContainer />
      <Pagination />
    </main>
  );
};

export default Garage;
