import { useEffect } from 'react';
import { marketSocket } from '@/services/websocket/marketSocket';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPrice, setSocketStatus } from './marketSlice';
import { selectMarketPrice } from './marketSelectors';

/**
 * Subscribes to a live symbol on the market websocket and keeps the price
 * in the `market` slice, so any number of widgets can read the same value
 * from the store instead of holding their own local copy.
 */
export const useMarketPrice = (symbol: string) => {
  const dispatch = useAppDispatch();
  const price = useAppSelector(selectMarketPrice(symbol));

  useEffect(() => {
    marketSocket.connect();

    const unsubscribeStatus = marketSocket.onStatusChange((status) => {
      dispatch(setSocketStatus(status));
    });

    const onPrice = (p: number) => {
      dispatch(setPrice({ symbol, price: p }));
    };

    marketSocket.subscribe(symbol, onPrice);

    return () => {
      marketSocket.unsubscribe(symbol, onPrice);
      unsubscribeStatus();
    };
  }, [symbol, dispatch]);

  return price;
};
