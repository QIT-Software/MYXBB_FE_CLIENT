import { useLazyGetProfileQuery } from '@/api/Auth'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { TLoginForm } from '@/types/types'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ClipLoader from 'react-spinners/ClipLoader'

const CheckoutAuth = ({ login, loginLoading, hideDesc }: any) => {
  const [getProfile] = useLazyGetProfileQuery()
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({
    mode: 'onChange',
  })

  const onSubmit = async (data: TLoginForm) => {
    await login(data).unwrap()
    await getProfile({}).unwrap()
  }
  return (
    <div className='w-full bg-secondary-white flex flex-col gap-5 px-[30px] pt-[25px] pb-[20px]'>
      {!hideDesc && (
        <div className='text-[15px] text-primary-gray'>
          If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the
          Billing & Shipping section.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <Input
          placeholder='Username or email *'
          type='email'
          id='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
            validate: value => {
              const noCyrillic = /^[^\u0400-\u04FF]+$/.test(value)
              return noCyrillic || 'Email must not contain Cyrillic characters'
            },
          })}
          className={`mt-1 block w-full px-3 py-2 border text-[15px] text-gray-850 border-secondary-dark-gray/1
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
        />
        <Input
          placeholder='Password *'
          type={'password'}
          id='password'
          maxLength={20}
          {...register('password', {
            required: 'Password is required',
            maxLength: {
              value: 20,
              message: 'Password must be less than 20 characters',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            validate: value => {
              if (!/[^\u0400-\u04FF]/.test(value)) {
                return 'Please verify that you are entering the correct password.'
              }
              if (/\s/.test(value)) {
                return 'Password must not contain spaces'
              }
              return true
            },
          })}
          className={`mt-1 block w-full px-3 py-2 text-[15px] text-gray-850 border border-secondary-dark-gray/1
                   rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
        />
        <Button type='submit' className='max-w-[94px] w-full bg-primary-hover-red hover:bg-red-100'>
          {loginLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Sign in'}
        </Button>
        <Link className='text-primary-hover-red text-[15px]' href={`/auth/reset-password`}>
          Lost your password?
        </Link>
      </form>
    </div>
  )
}

export default CheckoutAuth
