export const env = {
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  brentSymbol: import.meta.env.VITE_BRENT_SYMBOL,
  btcSymbol: import.meta.env.VITE_BTC_SYMBOL,
} as const;

/**
 * Every symbol the app subscribes to for live prices. This is the same
 * source of truth PriceWidget/ChartWidget/StatsWidget use - reused here
 * (rather than a separately hardcoded list) so the alert form's symbol
 * picker can never drift out of sync with what the market feed actually
 * supports.
 */
export const AVAILABLE_SYMBOLS = [env.brentSymbol, env.btcSymbol] as const;

