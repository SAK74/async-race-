import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CARS_PER_PAGE, SERVER_URL } from '@/_constants';
import { Car } from '@/types';

type CarResponse = {
  count: number;
  data: Car[];
};

const carApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
  }),
  tagTypes: ['cars', 'winners'],
  endpoints(build) {
    return {
      getCarsByPage: build.query<CarResponse, { page: number }>({
        query(arg) {
          return {
            url: '/garage',
            async responseHandler(response) {
              const body = await response.json();
              const count = response.headers.get('X-Total-Count');
              return { count: Number(count), data: body };
            },
            params: { _limit: CARS_PER_PAGE, _page: arg.page },
          };
        },
        providesTags: (_, __, arg) => [{ type: 'cars' as const, id: arg.page }],
      }),

      createCar: build.mutation<unknown, Omit<Car, 'id'>>({
        query(arg) {
          return { url: '/garage', method: 'POST', body: arg };
        },
        invalidatesTags: ['cars'],
      }),

      updateCar: build.mutation<unknown, Car>({
        query({ id, name, color }) {
          return { url: `/garage/${id}`, method: 'PUT', body: { name, color } };
        },
        invalidatesTags: ['cars'],
      }),

      deleteCar: build.mutation<unknown, { id: number }>({
        query({ id }) {
          return { url: `/garage/${id}`, method: 'DELETE' };
        },
        invalidatesTags: ['cars'],
      }),

      deleteWinner: build.mutation<unknown, { id: number }>({
        query({ id }) {
          return { url: `/winners/${id}`, method: 'DELETE' };
        },
        invalidatesTags: ['winners'],
      }),
    };
  },
});

export const {
  reducer,
  middleware,
  useGetCarsByPageQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useDeleteWinnerMutation,
} = carApi;
