import { baseApi } from './baseApi';

type BrentResponse = {
  data: {
    price: number;
  };
};

export const brentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrentPrice: builder.query<number, void>({
      query: () => ({
        url: 'prices/latest',
        headers: {
          authorization: `Token ${import.meta.env.VITE_OIL_PRICE_TOKEN}`,
        },
      }),
      transformResponse: (response: BrentResponse) => {
        return response.data.price;
      },
      providesTags: ['Market'],
    }),
  }),
});

export const { useGetBrentPriceQuery } = brentApi;
