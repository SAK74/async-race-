import { RouteObject } from 'react-router-dom';
import { RootLayout } from './components';
import { Garage, Winners, ErrorPage } from './pages';

const routes: RouteObject[] = [
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

export default routes;
