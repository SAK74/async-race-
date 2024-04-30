import { Winner } from '@/types';
import { FC } from 'react';

const WinnersTab: FC<{ winners: Winner[] }> = ({ winners }) => {
  const caption = ['№', 'Car', 'Name', 'Wins', 'Best time (sec)'];
  return (
    <>
      <table className="w-full  rounded-lg ">
        <thead className="border-b-2 text-cyan-300 border-gray-500">
          <tr className="">
            {caption.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {winners.map(({ id, time, wins }) => (
            <tr key={id} className="">
              <td>{id}</td>
              <td>-</td>
              <td>-</td>
              <td>{wins}</td>
              <td>{time}</td>
            </tr>
          ))}
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
