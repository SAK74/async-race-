import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import { GarageControll, GarageContainer } from '@/components/garage';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';

const Garage = function () {
  const { data } = useGetCarsByPageQuery({ page: 1 });
  const { page } = useTypedSelector((state) => state.garage);
  const pages = data && Math.ceil(data.count / CARS_PER_PAGE);
  return (
    <main className="flex flex-col gap-4">
      <div>Garage ({data?.count ?? '?'})</div>
      <GarageControll />
      <GarageContainer />
      <Pagination page={page} pages={pages} />
    </main>
  );
};

export default Garage;
