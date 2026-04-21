import { baseApi } from '@/services/api/baseApi';

type BrentResponse = {
  data: {
    brentPrice: {
      price: number;
      symbol: string;
    };
  };
};

export const marketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrentPrice: builder.query<{ price: number; symbol: string }, void>({
      query: () => ({
        url: import.meta.env.VITE_GRAPHQL_URL,
        method: 'POST',
        body: JSON.stringify({
          query: `
            query {
              brentPrice {
                price
                symbol
              }
            }
          `,
        }),
      }),
      transformResponse: (res: BrentResponse) => res.data.brentPrice,
    }),
  }),
});

export const { useGetBrentPriceQuery } = marketApi;
