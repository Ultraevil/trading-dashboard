import type { RootState } from '@/app/store';

export const selectMarketPrice = (symbol: string) => (state: RootState) =>
  state.market.prices[symbol] ?? null;

export const selectSocketStatus = (state: RootState) =>
  state.market.socketStatus;
