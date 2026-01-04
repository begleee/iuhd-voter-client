import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from './rates-slice';

export const store = configureStore({
  reducer: { 
    rates: ratesReducer,
  }
})