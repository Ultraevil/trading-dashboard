import { baseApi } from './baseApi';
import { GET_BRENT_PRICE } from '@/services/graphql/queries/getBrentPrice';

type BrentResponse = {
  data: {
    brentPrice: {
      price: number;
      symbol: string;
    };
  };
};

export const brentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrentPrice: builder.query<{ price: number; symbol: string }, void>({
      query: () => ({
        body: JSON.stringify({ query: GET_BRENT_PRICE }),
      }),
      transformResponse: (res: BrentResponse) => res.data.brentPrice,
      providesTags: ['Market'],
    }),
  }),
});

export const { useGetBrentPriceQuery } = brentApi;
