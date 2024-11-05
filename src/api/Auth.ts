'use client'
import { TProfileResponse } from './../types/types'
import { mainApi } from './index'
import { saveAuthToken } from './utils/SaveToken'
import { store } from '@/redux/store'
import { setUserProfile, setUserRole } from '@/redux/slices/user/userSlice'

export const authApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: data => {
        return {
          url: `/user/create/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    login: builder.mutation({
      query: data => {
        return {
          url: `/user/client/token/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
      invalidatesTags: ['Profile'],
    }),
    reset: builder.mutation({
      query: data => {
        return {
          url: `/user/password/reset/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    confirmPassword: builder.mutation({
      query: data => {
        return {
          url: `/user/password/reset/confirm/`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    googleAuth: builder.query({
      query: () => ({
        url: `/user/social/google/get-link/`,
        method: 'GET',
      }),
    }),
    facebookAuth: builder.query({
      query: () => ({
        url: `/user/social/facebook/get-link/`,
        method: 'GET',
      }),
    }),
    socialAuth: builder.mutation({
      query: data => {
        return {
          url: `user/social/google/login`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    facebookToken: builder.mutation({
      query: data => {
        return {
          url: `user/social/facebook/login`,
          method: 'POST',
          body: data,
        }
      },
      transformResponse: saveAuthToken,
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/user/me/`,
        method: 'GET',
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      providesTags: ['Profile'],
    }),
    patchProfile: builder.mutation({
      query: data => ({
        url: `/user/me/`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      invalidatesTags: ['Profile'],
    }),
    patchAvatar: builder.mutation({
      query: data => ({
        url: `/user/me/avatar/`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: TProfileResponse) => {
        store.dispatch(setUserProfile(response))
        store.dispatch(setUserRole(response.role))
        return response
      },
      invalidatesTags: ['Profile'],
    }),
    contactForm: builder.mutation({
      query: data => ({
        url: `/appointment/email-form/contact/`,
        method: 'POST',
        body: data,
      }),
    }),
    submitPayment: builder.mutation({
      query: token => ({
        url: `/user/payment-cards/`,
        method: 'POST',
        body: token,
      }),
      invalidatesTags: ['Cards'],
    }),
    deletePaymentMethod: builder.mutation({
      query: id => ({
        url: `/user/payment-cards/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cards'],
    }),
    getPaymentCards: builder.query({
      query: () => ({
        url: `/user/payment-cards/`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    markDefaultCard: builder.mutation({
      query: id => ({
        url: `/user/payment-cards/${id}`,
        method: 'PATCH',
        body: { is_default: true },
      }),
      providesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
  }),
})

export const {
  useMarkDefaultCardMutation,
  useDeletePaymentMethodMutation,
  useLoginMutation,
  useGetPaymentCardsQuery,
  useConfirmPasswordMutation,
  useResetMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  usePatchProfileMutation,
  usePatchAvatarMutation,
  useSignupMutation,
  useLazyGoogleAuthQuery,
  useLazyFacebookAuthQuery,
  useFacebookTokenMutation,
  useSocialAuthMutation,
  useContactFormMutation,
  useSubmitPaymentMutation,
} = authApi
