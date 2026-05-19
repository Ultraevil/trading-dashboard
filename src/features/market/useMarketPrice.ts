import { useEffect, useState } from 'react';
import { marketSocket } from '@/services/socket/marketSocket';

export const useMarketPrice = (symbol: string) => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    marketSocket.connect();

    const cb = (p: number) => setPrice(p);

    marketSocket.subscribe(symbol, cb);

    return () => {
      marketSocket.unsubscribe(symbol, cb);
    };
  }, [symbol]);

  return price;
};
