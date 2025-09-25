import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import currencyReducer from '../features/currency/currencySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    currency: currencyReducer,
  },
});