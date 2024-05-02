import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order, SortType } from '@/types';

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
      state.page = payload; // eslint-disable-line
    },
    setSort: (state, { payload }: PayloadAction<SortType>) => {
      state.sort = payload; // eslint-disable-line
      state.order = state.order === Order.ASC ? Order.DESC : Order.ASC; // eslint-disable-line
    },
  },
});

export default winnerSlice.reducer;

export const { setPage: setWinnerPage, setSort: setWinnersSort } = winnerSlice.actions;
