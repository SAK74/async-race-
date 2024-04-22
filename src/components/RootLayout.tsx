import { NavLink, Outlet } from 'react-router-dom';
import { Header } from './Header';

export const RootLayout = () => {
  return (
    <>
      <Header>
        <nav>
          <NavLink to={'/'}>Garage</NavLink>
          <NavLink to={'/winners'}>Winners</NavLink>
        </nav>
      </Header>
      <div className="flex-grow w-full p-4">
        <Outlet />
      </div>
    </>
  );
};
