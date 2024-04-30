import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import garageReducer from './garageSlice';
import winnersReducer from './winnersSlice';
import { reducer as apiReducer, middleware as apiMiddleware } from './apiSlice';

const store = configureStore({
  reducer: {
    garage: garageReducer,
    api: apiReducer,
    winners: winnersReducer,
  },
  middleware: (getDefault) => getDefault().concat(apiMiddleware),
});
export default store;

export type Store = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;
export const useTypedDispatch = () => useDispatch<typeof store.dispatch>();

export {
  useGetCarsByPageQuery,
  useCreateCarMutation,
  useCreateWinnerMutation,
  useDeleteCarMutation,
  useDeleteWinnerMutation,
  useGetCarByIdQuery,
  useGetWinnerByIdQuery,
  useGetWinnersByPageQuery,
  useUpdateCarMutation,
  useUpdateWinnerMutation,
} from './apiSlice';
export { setGaragePage } from './garageSlice';
export { setWinnerPage } from './winnersSlice';
