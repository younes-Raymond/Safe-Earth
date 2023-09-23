// mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isUserInsideCircle: false,
  },
  reducers: {
    setUserInsideCircle: (state, action) => {
      state.isUserInsideCircle = action.payload;
    },
  },
});

export const { setUserInsideCircle } = mapSlice.actions;
export default mapSlice.reducer;

