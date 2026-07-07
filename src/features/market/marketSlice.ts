import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SocketStatus } from '@/services/websocket/marketSocket';

export interface MarketState {
  prices: Record<string, number>;
  socketStatus: SocketStatus;
}

const initialState: MarketState = {
  prices: {},
  socketStatus: 'idle',
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setPrice: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>,
    ) => {
      state.prices[action.payload.symbol] = action.payload.price;
    },

    setSocketStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.socketStatus = action.payload;
    },
  },
});

export const { setPrice, setSocketStatus } = marketSlice.actions;

export default marketSlice.reducer;
