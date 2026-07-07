import { useEffect, Fragment } from 'react';
import type { ReactNode } from 'react';
import { marketSocket } from '@/services/websocket/marketSocket';

/**
 * Owns the lifecycle of the shared market websocket connection: connects
 * once when the app mounts and tears the connection down on unmount, so
 * individual widgets only need to subscribe/unsubscribe to symbols.
 */
export const MarketProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    marketSocket.connect();

    return () => {
      marketSocket.disconnect();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
};
