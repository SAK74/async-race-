import type { FC, SVGProps } from 'react';
import { useGetCarByIdQuery } from '@/store';
import { type Winner } from '@/types';

const WinnerRow: FC<{ winner: Winner; CarIcon: FC<SVGProps<SVGSVGElement>> }> = function ({
  winner,
  CarIcon,
}) {
  const { data, isLoading } = useGetCarByIdQuery({ id: winner.id });
  return (
    <tr className="*:text-center *:px-4 *:py-2">
      {isLoading && <td colSpan={5}>....Loading....</td>}
      {data && (
        <>
          <td>{winner.id}</td>
          <td aria-label="car-icon">
            <CarIcon fill={data.color} className="w-20" />
          </td>
          <td>{data.name}</td>
          <td>{winner.wins}</td>
          <td>{winner.time}</td>
        </>
      )}
    </tr>
  );
};

export default WinnerRow;
