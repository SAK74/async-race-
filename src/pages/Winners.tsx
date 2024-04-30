import { Pagination } from '@/components';
import WinnersTab from '@/components/winners/WinnersTab';
import { useGetWinnersByPageQuery } from '@/store/apiSlice';
import { FC } from 'react';

const Winners: FC = () => {
  const { data } = useGetWinnersByPageQuery({ _page: 1 });
  console.log(data);

  return (
    <main>
      <h1>Winners</h1>
      {data && <WinnersTab winners={data.data} />}
      {/* <Pagination/> */}
    </main>
  );
};

export default Winners;
