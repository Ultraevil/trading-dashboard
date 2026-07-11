import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { StatsWidget } from './StatsWidget';
import { env } from '@/config/env';

const mockUseMarketPrice = jest.fn();

jest.mock('@/features/market/useMarketPrice', () => ({
  useMarketPrice: (symbol: string) => mockUseMarketPrice(symbol),
}));

describe('StatsWidget', () => {
  beforeEach(() => {
    mockUseMarketPrice.mockReset();
  });

  it('shows placeholders before any price tick has arrived', () => {
    mockUseMarketPrice.mockReturnValue(undefined);
    renderWithProviders(<StatsWidget />);

    // 4 of the 5 stat rows show the "no data yet" placeholder; the 5th
    // (Samples) shows a count instead, asserted separately below.
    expect(screen.getAllByText('—')).toHaveLength(4);
    expect(screen.getByText('0')).toBeInTheDocument(); // samples count
  });

  it('renders the latest price as "Last" once a tick has arrived', () => {
    mockUseMarketPrice.mockReturnValue(65000);
    renderWithProviders(<StatsWidget />);

    // with a single sample, last/low/high/avg are all the same value
    expect(screen.getAllByText('$65000.00')).toHaveLength(4);
    expect(screen.getByText('1')).toBeInTheDocument(); // samples count
  });

  it('subscribes to the shared BTC symbol', () => {
    mockUseMarketPrice.mockReturnValue(100);
    renderWithProviders(<StatsWidget />);

    expect(mockUseMarketPrice).toHaveBeenCalledWith(env.btcSymbol);
  });
});
