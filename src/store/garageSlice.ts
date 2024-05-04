import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const garageSlice = createSlice({
  initialState: { page: 1, isSound: true },
  name: 'garage',
  // reducerPath:'garage',
  reducers: {
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload; //eslint-disable-line
    },
    switchSound(state) {
      state.isSound = !state.isSound; //eslint-disable-line
    },
  },
});

export default garageSlice.reducer;
export const { setPage: setGaragePage, switchSound } = garageSlice.actions;
