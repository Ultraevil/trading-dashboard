import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { marketSocket } from '@/services/websocket/marketSocket';
import { alertsApi } from '@/services/api/alertsApi';
import { addToast, selectIsAlertSoundEnabled } from '@/features/ui/uiSlice';
import { playAlertSound } from '@/shared/lib/playAlertSound';
import type { PriceAlertPayload } from './alert.types';

/**
 * Subscribes to the `price-alert` websocket event for as long as it's
 * mounted. Meant to be mounted once near the app root (see
 * AlertNotificationsProvider) rather than on the alerts page itself, so a
 * triggered alert still shows a toast even while the user is looking at
 * the dashboard or anywhere else.
 */
export const useAlertNotifications = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isSoundEnabled = useAppSelector(selectIsAlertSoundEnabled);

  useEffect(() => {
    const onAlert = (payload: PriceAlertPayload) => {
      dispatch(
        addToast(
          t('alerts.notifications.triggered', {
            symbol: payload.symbol,
            condition: t(`alerts.condition.${payload.condition}`),
            targetPrice: payload.targetPrice,
            currentPrice: payload.currentPrice,
          }),
          'info',
        ),
      );

      if (isSoundEnabled) {
        playAlertSound();
      }

      // The payload doesn't carry the alert's id, so we can't patch the
      // cached list precisely - invalidating it refetches from the
      // backend, which also picks up the `enabled: false` / `triggeredAt`
      // it just set on the alert that fired.
      dispatch(alertsApi.util.invalidateTags(['Alert']));
    };

    const unsubscribe = marketSocket.onPriceAlert(onAlert);
    return () => {
      unsubscribe();
    };
  }, [dispatch, t, isSoundEnabled]);
};
