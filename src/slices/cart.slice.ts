import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../models/IMenu';
import { RootState } from '../redux/store';

interface CartItem extends Item {
  amount: number;
}

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state[itemIndex].amount++;
      } else {
        state.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload);
      if (state[itemIndex].amount > 1) {
        state[itemIndex].amount--;
      } else {
        return state.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const getCartItems = (state: RootState) => state.cartItems;
export const getTotalPrice = (state: RootState) =>
  state.cartItems.reduce((acc, next) => (acc += next.amount * next.price), 0);

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
