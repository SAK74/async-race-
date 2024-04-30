import { Winner } from '@/types';
import { FC } from 'react';
import WinnerRow from './WinnerRow';
import CarIcon from '@/assets/car.svg?react';

const WinnersTab: FC<{ winners: Winner[] }> = ({ winners }) => {
  const caption = ['№', 'Car', 'Name', 'Wins', 'Best time (sec)'];
  return (
    <>
      <table className="w-[500px]  rounded-lg self-center">
        <thead className="border-b-2 text-cyan-300 border-gray-500">
          <tr className="*:text-center *:p-4">
            {caption.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => (
            <WinnerRow key={winner.id} winner={winner} CarIcon={CarIcon} />
            // <tr key={id} className="">
            //   <td>{id}</td>
            //   <td>-</td>
            //   <td>-</td>
            //   <td>{wins}</td>
            //   <td>{time}</td>
            // </tr>
          ))}
          {/* <tr>
            <td colSpan={5} className="text-center">
              .....Loading....
            </td>
          </tr> */}
        </tbody>
      </table>

      <br />
      {/* <hr /> */}
      <br />
      {/* <table className="w-full border">
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};

export default WinnersTab;
