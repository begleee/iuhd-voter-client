import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from './rates-slice';
import answersReducer from './answers-slice';

export const store = configureStore({
  reducer: { 
    rates: ratesReducer,
    answers: answersReducer
  }
});
