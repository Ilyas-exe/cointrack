import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = { items: [], isLoading: false };

export const getCategories = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.getCategories(token);
});

export const addCategory = createAsyncThunk('categories/add', async (name, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await categoryService.addCategory(name, token);
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: { reset: (state) => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;