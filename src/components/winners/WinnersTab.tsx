import { Order, type Winner } from '@/types';
import type { FC } from 'react';
import WinnerRow from './WinnerRow';
import CarIcon from '@/assets/car.svg?react';
import { setWinnersSort, useTypedDispatch, useTypedSelector } from '@/store';
import cn from '@/utils/cn';

const WinnersTab: FC<{ winners: Winner[] }> = ({ winners }) => {
  const { sort, order } = useTypedSelector((state) => state.winners);
  // console.log({ order });

  const caption = ['№', 'Car', 'Name', 'Wins', 'Best time (sec)'] as const;
  const dispatch = useTypedDispatch();

  const onClick = (key: (typeof caption)[number]) => {
    switch (key) {
      case 'Wins':
        dispatch(setWinnersSort('wins'));
        return;
      case 'Best time (sec)':
        dispatch(setWinnersSort('time'));
        return;
      case '№':
        dispatch(setWinnersSort('id'));
        return;
      default:
        throw Error('Wrong collumn!');
    }
  };

  return (
    <table className="self-center">
      <thead className="border-b-2 text-cyan-300 border-gray-500">
        <tr className="*:text-center *:p-4">
          {caption.map((col) => (
            <td
              key={col}
              className={cn({
                'cursor-pointer': col === 'Wins' || col === 'Best time (sec)' || col === '№',
              })}
              onClick={
                col === 'Wins' || col === 'Best time (sec)' || col === '№'
                  ? () => onClick(col)
                  : undefined
              }
            >
              {col}
              {col === '№' && sort === 'id' && <span>{order === Order.ASC ? '👆' : '👇'}</span>}
              {col === 'Wins' && sort === 'wins' && (
                <span>{order === Order.ASC ? '👆' : '👇'}</span>
              )}
              {col === 'Best time (sec)' && sort === 'time' && (
                <span>{order === Order.ASC ? '👆' : '👇'}</span>
              )}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => (
          <WinnerRow key={winner.id} winner={winner} CarIcon={CarIcon} />
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTab;
