import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import WinnersTab from '@/components/winners/WinnersTab';
import { setWinnerPage, useTypedDispatch, useTypedSelector } from '@/store';
import { useGetWinnersByPageQuery } from '@/store';
import type { FC } from 'react';

const Winners: FC = () => {
  const { page } = useTypedSelector((state) => state.winners);
  const { data } = useGetWinnersByPageQuery({ _page: page });
  // console.log(data);
  const dispatch = useTypedDispatch();
  const onSetPage = (page: number) => {
    dispatch(setWinnerPage(page));
  };

  return (
    <main className="flex flex-col">
      <h1>Winners</h1>
      {data && <WinnersTab winners={data.data} />}
      <Pagination
        page={page}
        onSetPage={onSetPage}
        pages={data && Math.ceil(data.count / CARS_PER_PAGE)}
      />
    </main>
  );
};

export default Winners;
