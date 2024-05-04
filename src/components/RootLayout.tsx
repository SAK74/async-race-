import { NavLink, Outlet } from 'react-router-dom';
import { type FC } from 'react';
import { Header, MainControll } from '.';
import { Button } from './ui';

const RootLayout: FC = function () {
  return (
    <>
      <Header>
        <div className="flex sm:gap-4">
          <nav className="w-min md:w-max">
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
          <MainControll />
        </div>
      </Header>
      <div className="flex-grow w-full p-4">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
