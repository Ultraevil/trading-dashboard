export const env = {
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  brentSymbol: import.meta.env.VITE_BRENT_SYMBOL,
  btcSymbol: import.meta.env.VITE_BTC_SYMBOL,
} as const;
