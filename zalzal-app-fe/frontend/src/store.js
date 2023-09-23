// store.js
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapSlice'; // Import the map reducer
// Import and combine other reducers as needed

const store = configureStore({
  reducer: {
    map: mapReducer, // Add the map reducer to the store
    // Add other reducers here
  },
});

export default store;
