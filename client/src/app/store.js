import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import currencyReducer from '../features/currency/currencySlice';
import recurringReducer from '../features/recurring/recurringSlice';
import categoryReducer from '../features/categories/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    currency: currencyReducer,
    recurring: recurringReducer,
    categories: categoryReducer,
  },
});