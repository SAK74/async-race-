import { NavLink, Outlet } from 'react-router-dom';
import { type FC } from 'react';
import { Header } from '.';
import { Button } from './ui/button/Button';

const RootLayout: FC = function () {
  return (
    <>
      <Header>
        <nav>
          <NavLink to="/">
            {({ isActive }) => (
              <Button variant="link" active={isActive}>
                Garage
              </Button>
            )}
          </NavLink>
          <NavLink to="/winners">
            {({ isActive }) => (
              <Button variant="link" active={isActive}>
                Winners
              </Button>
            )}
          </NavLink>
        </nav>
      </Header>
      <div className="flex-grow w-full p-4">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
