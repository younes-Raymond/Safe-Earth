// store.js
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapSlice'; // Import the map reducer
// Import and combine other reducers as needed

const store = configureStore({
  reducer: {
    map: mapReducer, 
  },
});

export default store;
