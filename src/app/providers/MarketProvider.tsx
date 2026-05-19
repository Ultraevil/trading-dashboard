import { useEffect } from 'react';
import { marketSocket } from '@/services/socket/marketSocket';

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    marketSocket.connect();

    return () => {
      marketSocket.disconnect();
    };
  }, []);

  return children;
};
