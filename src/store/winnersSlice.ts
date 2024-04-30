import { Order, SortType } from '@/types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  page: number;
  sort?: SortType;
  order?: Order;
} = { page: 1 };

const winnerSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setSort: (state, { payload }: PayloadAction<SortType>) => {
      state.sort = payload;
      state.order = state.order === Order.ASC ? Order.DESC : Order.ASC;
    },
    // setOrder: (state, { payload }: PayloadAction<Order>) => {
    //   state.order = payload;
    // },
  },
});

export default winnerSlice.reducer;

export const {
  setPage: setWinnerPage,
  // setOrder: setWinnersOrder,
  setSort: setWinnersSort,
} = winnerSlice.actions;
