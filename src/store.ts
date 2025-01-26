import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice.ts';
import dealersReducer from './features/dealersSlice.ts';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        dealers: dealersReducer,
    },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store