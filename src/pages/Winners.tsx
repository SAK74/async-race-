import type { FC } from 'react';
import { CARS_PER_PAGE } from '@/_constants';
import { Pagination } from '@/components';
import WinnersTab from '@/components/winners/WinnersTab';
import {
  setWinnerPage,
  useTypedDispatch,
  useTypedSelector,
  useGetWinnersByPageQuery,
} from '@/store';

const Winners: FC = function () {
  const { page, order, sort } = useTypedSelector((state) => state.winners);
  const { data, isLoading } = useGetWinnersByPageQuery({ _page: page, _order: order, _sort: sort });
  const dispatch = useTypedDispatch();
  const onSetPage = (_page: number) => {
    dispatch(setWinnerPage(_page));
  };

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl ml-8">Winners ({data?.count ?? '?'})</h1>
      {isLoading && (
        <>
          <div className="text-center pt-8 pb-2">...Wait a moment...</div>
          <div className="w-full h-6 bg-contain bg-car bg-no-repeat animate-race drop-shadow-[-15px_0_5px_rgba(0,0,0,.5)] bg-left" />
        </>
      )}
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
