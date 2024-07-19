import { configureStore } from '@reduxjs/toolkit';
import cartItems from '../slices/cart.slice';
import menuReducer from '../slices/menu.slice';
import venueReducer from '../slices/venue.slice';

export const store = configureStore({
  reducer: { cartItems, venue: venueReducer, menu: menuReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
