import { NavLink, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { Header } from '.';

const RootLayout: FC = function () {
  return (
    <>
      <Header>
        <nav>
          <NavLink to="/">Garage</NavLink>
          <NavLink to="/winners">Winners</NavLink>
        </nav>
      </Header>
      <div className="flex-grow w-full p-4">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
