import { useEffect, useRef, Fragment } from 'react';
import type { ReactNode } from 'react';
import { marketSocket } from '@/services/websocket/marketSocket';
import { useAppSelector } from '@/app/hooks';
import { selectAuthAccessToken } from '@/features/auth/authSelectors';

/**
 * Owns the lifecycle of the shared market websocket connection: connects
 * once when the app mounts and tears the connection down on unmount, so
 * individual widgets only need to subscribe/unsubscribe to symbols.
 *
 * The socket is opened with whatever access token is in localStorage at
 * connect time. Logging in (or out) after that changes the token but does
 * NOT recreate the connection by itself - so we watch it here and force a
 * re-handshake whenever it changes, otherwise the feed is stuck using the
 * stale (often anonymous) auth it started with until a full page refresh.
 */
export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  const previousTokenRef = useRef(accessToken);

  useEffect(() => {
    marketSocket.connect();

    return () => {
      marketSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (previousTokenRef.current === accessToken) return;

    previousTokenRef.current = accessToken;
    marketSocket.updateAuthToken();
  }, [accessToken]);

  return <Fragment>{children}</Fragment>;
};
