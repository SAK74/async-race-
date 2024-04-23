import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import garageReducer from './garageSlice';
import { reducer as apiReducer, middleware as apiMiddleware } from './apiSlice';

const store = configureStore({
  reducer: {
    garage: garageReducer,
    api: apiReducer,
  },
  middleware: (getDefault) => getDefault().concat(apiMiddleware),
});
export default store;

export type Store = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;
export const useTypedDispatch = () => useDispatch<typeof store.dispatch>();

// export * from './garageSlice';
export { useGetCarsByPageQuery } from './apiSlice';
