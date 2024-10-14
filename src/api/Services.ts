import { mainApi } from './index'

export const servicesApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query({
      query: () => ({
        url: `/employee/services/`,
        method: 'GET',
      }),
    }),
    getLocations: builder.query({
      query: () => ({
        url: '/user/stores/',
        method: 'GET',
      }),
      providesTags: [{ type: 'Location', id: 'LIST' }],
    }),
  }),
})

export const { useGetServicesQuery, useGetLocationsQuery } = servicesApi
