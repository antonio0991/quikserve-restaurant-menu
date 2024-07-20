// src/features/venue/venueSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VenueService } from '../api/api';
import { IVenue } from '../models/IVenue';

interface VenueState {
  venue: IVenue | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VenueState = {
  venue: null,
  status: 'idle',
  error: null,
};

export const fetchVenue = createAsyncThunk('venue/fetchVenue', async () => {
  const response = await VenueService.getVenue();
  return response;
});

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVenue.fulfilled, (state, action: PayloadAction<IVenue>) => {
        state.status = 'succeeded';
        state.venue = action.payload;
      })
      .addCase(fetchVenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default venueSlice.reducer;
