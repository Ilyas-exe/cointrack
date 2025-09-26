import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recurringService from './recurringService';

const initialState = { items: [], isError: false, isLoading: false, message: '' };

export const getRecurring = createAsyncThunk('recurring/getAll', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await recurringService.getRecurring(token);
});

export const addRecurring = createAsyncThunk('recurring/add', async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await recurringService.addRecurring(data, token);
});

export const applyRecurring = createAsyncThunk('recurring/apply', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await recurringService.applyRecurring(token);
});

export const recurringSlice = createSlice({
    name: 'recurring',
    initialState,
    reducers: { reset: (state) => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(getRecurring.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addRecurring.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(applyRecurring.fulfilled, (state, action) => {
                // This thunk returns the newly created transactions
                // The transactionSlice will handle adding them to its state
                console.log('Applied expenses and created transactions:', action.payload);
            });
    },
});

export const { reset } = recurringSlice.actions;
export default recurringSlice.reducer;