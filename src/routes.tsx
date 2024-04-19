import { RouteObject } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { Garage } from './pages/Garage';
import { Winners } from './pages/Winners';
import { ErrorPage } from './pages/ErrorPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Garage />,
        index: true,
      },
      {
        path: '/winners',
        element: <Winners />,
        index: true,
      },
    ],
  },
];
