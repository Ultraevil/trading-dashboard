import { useEffect, useRef, Fragment } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAuthAccessToken } from '@/features/auth/authSelectors';
import { resetMarket } from '@/features/market/marketSlice';
import { resetLayouts } from '@/features/dashboard/dashboardSlice';
import { baseApi } from '@/services/api/baseApi';

/**
 * Logging out (whether via the "Log out" button or an automatic 401 when
 * a refresh token expires - see `graphqlBaseQuery`) used to only clear
 * `state.auth`. Everything else that came from the authenticated session
 * - live prices already pushed over the socket, the dashboard layout
 * fetched from the backend, and any cached RTK Query responses - was left
 * exactly as it was, so a guest (or the next person to sign in on this
 * browser) would keep seeing the previous user's frozen prices and saved
 * grid until a full page refresh.
 *
 * This watches the access token and, on any transition from "logged in"
 * to "logged out", resets that session-scoped state back to its local
 * defaults.
 */
export const SessionCleanupProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuthAccessToken);
  const previousTokenRef = useRef(accessToken);

  useEffect(() => {
    const wasAuthenticated = Boolean(previousTokenRef.current);
    const isAuthenticated = Boolean(accessToken);
    previousTokenRef.current = accessToken;

    if (wasAuthenticated && !isAuthenticated) {
      dispatch(resetMarket());
      dispatch(resetLayouts());
      dispatch(baseApi.util.resetApiState());
    }
  }, [accessToken, dispatch]);

  return <Fragment>{children}</Fragment>;
};
