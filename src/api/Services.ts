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
      query: ({ is_for_shop = false, category = '', limit = 0, offset = 0, ordering = '' }) => {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (is_for_shop) params.append('is_for_shop', is_for_shop.toString())
        if (ordering) params.append('ordering', ordering)
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)

        return {
          url: `/orders/merch?${params.toString()}`,
          method: 'GET',
        }
      },
    }),
    getSelectedMerch: builder.query({
      query: ({ id, data }) => ({
        url: `/orders/merch/${id}/`,
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
    getCardsAmounts: builder.query({
      query: () => ({
        url: '/orders/merch/gift-card-amounts/',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetServicesQuery,
  useGetLocationsQuery,
  useGetProductsQuery,
  useGetSelectedMerchQuery,
  useGetCardsAmountsQuery,
} = servicesApi
