import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../features/weather/reducers';

export const store = configureStore({
  reducer: {
    
    weather: productsSlice, 
  },
});
