import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const garageSlice = createSlice({
  initialState: { page: 1 },
  name: 'garage',
  // reducerPath:'garage',
  reducers: {
    setPage(_, { payload }: PayloadAction<number>) {
      return { page: payload };
    },
  },
});

export default garageSlice.reducer;
