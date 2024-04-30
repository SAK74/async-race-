import { Order, SortType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  page: number;
  sort?: SortType;
  order?: Order;
} = { page: 1 };

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage: (_, { payload }: PayloadAction<number>) => ({ page: payload }),
  },
});

export default winnerSlice.reducer;
