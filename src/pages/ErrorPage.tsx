import { useRouteError } from 'react-router-dom';

const ErrorPage = function () {
  const error = useRouteError();
  console.error(error);
  // throw error;
  return <div>Something went wrong...</div>;
};

export default ErrorPage;
