import { mainApi } from './index'

export const servicesApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query({
      query: () => ({
        url: `/employee/services/`,
        method: 'GET',
      }),
    }),
    getProducts: builder.query({
      query: ({ is_for_shop = false, category = '', ordering = '' }) => {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (is_for_shop) params.append('is_for_shop', is_for_shop.toString())
        if (ordering) params.append('ordering', ordering)

        return {
          url: `/orders/merch/?${params.toString()}`,
          method: 'GET',
        }
      },
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

export const { useGetServicesQuery, useGetLocationsQuery, useGetProductsQuery } = servicesApi
