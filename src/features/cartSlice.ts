import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types/types';


const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.removeItem('cart');
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
