import { mainApi } from './index'

export const appointmentsApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    patchSelectedAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `appointment/appointments/${id}/customer-patch/`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getCustomBlends: builder.query({
      query: () => ({
        url: `/orders/custom-blends/`,
        method: 'GET',
      }),
    }),
    getTimeSlots: builder.query({
      query: ({ date = '', location = '', service = '', party_size = '' }) => {
        const params = new URLSearchParams()
        if (date) params.append('date', date)
        if (location) params.append('location_id', location)
        if (service) params.append('service_id', service)
        if (party_size) params.append('party_size', party_size)
        return {
          url: `appointment/appointments/available-time-slots/?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: [{ type: 'Appointments', id: 'LIST' }],
    }),
  }),
})

export const { useGetCustomBlendsQuery, useGetTimeSlotsQuery, usePatchSelectedAppointmentMutation } = appointmentsApi
