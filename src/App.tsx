import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { Footer } from './components';
import routes from './routes';
import store from './store';

const router = createBrowserRouter(routes);

const App: FC = function () {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Footer />
    </>
  );
};

export default App;
