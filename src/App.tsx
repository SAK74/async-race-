import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import { Footer } from './components';
import routes from './routes';

const router = createBrowserRouter(routes);

const App: FC = function () {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
