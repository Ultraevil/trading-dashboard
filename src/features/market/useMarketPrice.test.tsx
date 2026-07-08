import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createTestStore } from '@/test/createTestStore';
import { useMarketPrice } from './useMarketPrice';
import { selectSocketStatus } from './marketSelectors';

type PriceCallback = (price: number) => void;
type StatusCallback = (status: 'idle' | 'connected' | 'disconnected') => void;

const mockPriceSubscribers = new Map<string, Set<PriceCallback>>();
const mockStatusSubscribers = new Set<StatusCallback>();

jest.mock('@/services/websocket/marketSocket', () => ({
  marketSocket: {
    connect: jest.fn(),
    subscribe: (symbol: string, cb: PriceCallback) => {
      if (!mockPriceSubscribers.has(symbol)) mockPriceSubscribers.set(symbol, new Set());
      mockPriceSubscribers.get(symbol)!.add(cb);
    },
    unsubscribe: (symbol: string, cb: PriceCallback) => {
      mockPriceSubscribers.get(symbol)?.delete(cb);
    },
    onStatusChange: (cb: StatusCallback) => {
      mockStatusSubscribers.add(cb);
      return () => mockStatusSubscribers.delete(cb);
    },
  },
}));

const emitPrice = (symbol: string, price: number) => {
  mockPriceSubscribers.get(symbol)?.forEach((cb) => cb(price));
};

const emitStatus = (status: 'idle' | 'connected' | 'disconnected') => {
  mockStatusSubscribers.forEach((cb) => cb(status));
};

describe('useMarketPrice', () => {
  beforeEach(() => {
    mockPriceSubscribers.clear();
    mockStatusSubscribers.clear();
  });

  it('returns null before any tick has been received', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useMarketPrice('BTCUSDT'), { wrapper });
    expect(result.current).toBeNull();
  });

  it('updates when the socket emits a price tick for the subscribed symbol', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useMarketPrice('BTCUSDT'), { wrapper });

    act(() => {
      emitPrice('BTCUSDT', 65000);
    });

    expect(result.current).toBe(65000);
  });

  it('ignores ticks for a different symbol', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useMarketPrice('BTCUSDT'), { wrapper });

    act(() => {
      emitPrice('ETHUSDT', 3000);
    });

    expect(result.current).toBeNull();
  });

  it('writes the socket connection status into the market slice', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useMarketPrice('BTCUSDT'), { wrapper });

    act(() => {
      emitStatus('connected');
    });

    expect(selectSocketStatus(store.getState())).toBe('connected');
  });
});
