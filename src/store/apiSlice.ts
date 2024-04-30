import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CARS_PER_PAGE, SERVER_URL } from '@/_constants';
import { Car, Order, SortType, Winner } from '@/types';

type CarResponse = {
  count: number;
  data: Car[];
};

type WinnersResponse = {
  count: number;
  data: Winner[];
};

const responseHandler = async (response: Response) => {
  const body = await response.json();
  const count = response.headers.get('X-Total-Count');
  return { count: Number(count), data: body };
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
            responseHandler,
            params: { _limit: CARS_PER_PAGE, _page: arg.page },
          };
        },
        providesTags: (res, __, arg) =>
          res
            ? res.data
                .map((car) => ({ type: 'cars' as const, id: car.id }))
                .concat([{ type: 'cars' as const, id: arg.page }])
            : [{ type: 'cars' as const, id: arg.page }],
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
        invalidatesTags: (_, __, { id }) => [{ type: 'cars', id }],
      }),

      deleteCar: build.mutation<unknown, { id: number }>({
        query({ id }) {
          return { url: `/garage/${id}`, method: 'DELETE' };
        },
        invalidatesTags: ['cars'],
      }),

      getCarById: build.query<Car, { id: Car['id'] }>({
        query: ({ id }) => ({ url: `/garage/${id}` }),
        providesTags: (_, __, { id }) => [{ type: 'cars', id }],
      }),

      deleteWinner: build.mutation<unknown, { id: number }>({
        query({ id }) {
          return { url: `/winners/${id}`, method: 'DELETE' };
        },
        invalidatesTags: ['winners'],
      }),

      getWinnersByPage: build.query<
        WinnersResponse,
        { _page: number; _sort?: SortType; _order?: Order }
      >({
        query({ _page, _sort, _order }) {
          return {
            url: '/winners',
            responseHandler,
            params: { _limit: CARS_PER_PAGE, _page, _sort, _order },
          };
        },
        providesTags: (result, __, arg) => {
          const tagsBySort = Object.entries(arg).map(([_, value]) => ({
            type: 'winners' as const,
            id: value,
          }));
          return result
            ? [...result.data.map(({ id }) => ({ type: 'winners' as const, id })), ...tagsBySort]
            : tagsBySort;
        },
      }),

      createWinner: build.mutation<Winner, Omit<Winner, 'id'>>({
        query(arg) {
          return {
            url: '/winners',
            body: arg,
            method: 'POST',
          };
        },
        invalidatesTags: ['winners'],
      }),

      getWinnerById: build.query<Winner, { id: Winner['id'] }>({
        query({ id }) {
          return {
            url: `/winners/${id}`,
          };
        },
        providesTags: (_, __, { id }) => [{ type: 'winners', id }],
      }),

      updateWinner: build.mutation<Winner, Winner>({
        query({ id, time, wins }) {
          return {
            url: `/winners/${id}`,
            method: 'PUT',
            body: { time, wins },
          };
        },
        invalidatesTags: (_, __, { id }) => [{ type: 'winners', id }],
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
  useGetWinnersByPageQuery,
  useCreateWinnerMutation,
  useGetCarByIdQuery,
  useGetWinnerByIdQuery,
  useUpdateWinnerMutation,
} = carApi;
