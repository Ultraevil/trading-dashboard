import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/config';
import { createTestStore } from '@/test/createTestStore';
import { selectToasts } from '@/features/ui/uiSlice';
import { useAlertNotifications } from './useAlertNotifications';
import type { PriceAlertPayload } from './alert.types';

type AlertCallback = (payload: PriceAlertPayload) => void;

const mockAlertSubscribers = new Set<AlertCallback>();

jest.mock('@/services/websocket/marketSocket', () => ({
  marketSocket: {
    onPriceAlert: (cb: AlertCallback) => {
      mockAlertSubscribers.add(cb);
      return () => mockAlertSubscribers.delete(cb);
    },
  },
}));

const emitAlert = (payload: PriceAlertPayload) => {
  mockAlertSubscribers.forEach((cb) => cb(payload));
};

describe('useAlertNotifications', () => {
  beforeEach(() => {
    mockAlertSubscribers.clear();
  });

  const renderWithStore = () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    );

    renderHook(() => useAlertNotifications(), { wrapper });
    return store;
  };

  it('shows a toast when a price-alert event arrives', () => {
    const store = renderWithStore();

    act(() => {
      emitAlert({
        type: 'price-alert',
        symbol: 'BTCUSDT',
        currentPrice: 65120,
        targetPrice: 65000,
        condition: 'ABOVE',
        triggeredAt: new Date().toISOString(),
      });
    });

    const toasts = selectToasts(store.getState());
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toContain('BTCUSDT');
    expect(toasts[0].variant).toBe('info');
  });

  it('does not show a toast before any alert has triggered', () => {
    const store = renderWithStore();
    expect(selectToasts(store.getState())).toHaveLength(0);
  });

  it('unsubscribes on unmount', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    );

    const { unmount } = renderHook(() => useAlertNotifications(), { wrapper });
    expect(mockAlertSubscribers.size).toBe(1);

    unmount();
    expect(mockAlertSubscribers.size).toBe(0);
  });
});
