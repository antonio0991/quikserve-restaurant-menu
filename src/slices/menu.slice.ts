// src/features/menu/menuSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMenu } from '../models/IMenu';
import { MENU_DETAILS } from '../utils/urlUtil';

interface MenuState {
  menu: IMenu | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  menu: null,
  status: 'idle',
  error: null,
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await axios.get<IMenu>(MENU_DETAILS);
  return response.data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<IMenu>) => {
        state.status = 'succeeded';
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default menuSlice.reducer;
