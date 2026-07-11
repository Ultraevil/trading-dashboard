import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { PriceWidget } from './PriceWidget';
import { env } from '@/config/env';

const mockUseMarketPrice = jest.fn();

jest.mock('@/features/market/useMarketPrice', () => ({
  useMarketPrice: (symbol: string) => mockUseMarketPrice(symbol),
}));

describe('PriceWidget', () => {
  beforeEach(() => {
    mockUseMarketPrice.mockReset();
  });

  it('subscribes to the Brent futures symbol and the shared BTC symbol', () => {
    mockUseMarketPrice.mockReturnValue(null);
    renderWithProviders(<PriceWidget />);

    expect(mockUseMarketPrice).toHaveBeenCalledWith(env.brentSymbol);
    expect(mockUseMarketPrice).toHaveBeenCalledWith(env.btcSymbol);
  });

  it('shows no price text before either feed has ticked', () => {
    mockUseMarketPrice.mockReturnValue(null);
    renderWithProviders(<PriceWidget />);

    expect(screen.queryAllByText(/^\$/)).toHaveLength(0);
  });

  it('renders both live prices once their feeds have ticked', () => {
    mockUseMarketPrice.mockImplementation((symbol: string) =>
      symbol === env.brentSymbol ? 76.3 : 65000,
    );
    renderWithProviders(<PriceWidget />);

    expect(screen.getByText('$76.30')).toBeInTheDocument();
    expect(screen.getByText('$65000.00')).toBeInTheDocument();
  });

  it('renders only the Brent price while BTC is still waiting for a tick', () => {
    mockUseMarketPrice.mockImplementation((symbol: string) =>
      symbol === env.brentSymbol ? 76.3 : null,
    );
    renderWithProviders(<PriceWidget />);

    expect(screen.getByText('$76.30')).toBeInTheDocument();
    expect(screen.queryByText('$65000.00')).not.toBeInTheDocument();
  });
});
