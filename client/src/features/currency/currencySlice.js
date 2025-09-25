import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import currencyService from './currencyService';

const initialState = {
  selectedCurrency: 'USD',
  rates: {},
  isError: false,
  isLoading: false,
  message: '',
};

export const getRates = createAsyncThunk('currency/getRates', async (_, thunkAPI) => {
  try {
    return await currencyService.getRates();
  } catch (error) { /* ... */ }
});

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload.conversion_rates;
      })
      .addCase(getRates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;