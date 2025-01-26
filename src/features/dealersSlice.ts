import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DealersState, Product } from '../types/types';

 const initialState: DealersState = {
    products: [],
    status: 'idle',
    error: null,
};


export const fetchAllProducts = createAsyncThunk<Product[], void>(
    'dealers/fetchAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://test-frontend.dev.int.perx.ru/api/goods/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const fetchProductsByDealers = createAsyncThunk<Product[], string>(
    'dealers/fetchProductsByDealers',
    async (dealers: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://test-frontend.dev.int.perx.ru/api/goods/?dealers=${dealers}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const dealersSlice = createSlice({
    name: 'dealers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.error = null; // Сброс ошибки
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string; // Сохранение сообщения об ошибке
            })
            .addCase(fetchProductsByDealers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByDealers.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.error = null; 
            })
            .addCase(fetchProductsByDealers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

// Экспортируем редьюсер
export default dealersSlice.reducer;
