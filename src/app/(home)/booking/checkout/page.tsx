'use client'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Image from 'next/image'
import Summary from '../../components/CartSummary/Summary'
import Label from '@/components/ui/Label/Label'
import { Input } from '@/components/ui/Input/Input'
import { MyxIcon } from '@/components/icons'
import { TOption, TRegisterForm } from '@/types/types'
import { Controller, useForm } from 'react-hook-form'
import { MaskedInput } from 'antd-mask-input'
import Select, { StylesConfig } from 'react-select'
import { useGetStatesQuery } from '@/api/Locations'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import { useCreateOrderMutation } from '@/api/Appointments'
import { Button } from '@/components/ui/Button/Button'
import { useLoginMutation, useSignupMutation } from '@/api/Auth'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import toast from 'react-hot-toast'
import { getUser } from '@/redux/slices/user/selectors'
import { useSelector } from 'react-redux'
import { getFromStorage, removeFromStorage } from '@/utils/storage'
import { useRouter } from 'next/navigation'
import CheckoutAuth from './components/CheckoutAuth/CheckoutAuth'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '42px',
    marginTop: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '42px',
    padding: '0',
    margin: '0',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '42px',
  }),
}

const CheckoutPage = () => {
  const profile = useSelector(getUser)
  const [showDifferentAddress, setShowDifferentAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signup] = useSignupMutation()
  const [createOrder] = useCreateOrderMutation()
  const [login, { isLoading: loginLoading }] = useLoginMutation()
  const router = useRouter()

  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Checkout', href: '/#' },
  ]
  const { data: states, isSuccess } = useGetStatesQuery({})

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      auth: {
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        email: profile?.email || '',
        password: '',
        phone: profile?.phone || '',
      },
      billing_address: {
        region: profile?.billing_address?.region || '',
        state: profile?.billing_address?.state || '',
        city: profile?.billing_address?.city || '',
        address: profile?.billing_address?.address || '',
        zip_code: profile?.billing_address?.zip_code || '',
        apartment: profile?.billing_address?.apartment || '',
      },
      shipping_address: {
        region: '',
        state: '',
        city: '',
        address: '',
        zip_code: '',
        apartment: '',
      },
      comment: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (profile) {
      reset({
        auth: {
          first_name: profile?.first_name || '',
          last_name: profile?.last_name || '',
          email: profile?.email || '',
          password: '',
          phone: profile?.phone || '',
        },
        billing_address: {
          region: profile?.billing_address?.region || '',
          state: profile?.billing_address?.state || '',
          city: profile?.billing_address?.city || '',
          address: profile?.billing_address?.address || '',
          zip_code: profile?.billing_address?.zip_code || '',
          apartment: profile?.billing_address?.apartment || '',
        },
        shipping_address: {
          region: '',
          state: '',
          city: '',
          address: '',
          zip_code: '',
          apartment: '',
        },
        comment: '',
      })
    }
  }, [profile, reset])
  const password = watch('auth.password')

  const regionOptions = [
    {
      value: 'United States',
      label: 'United States',
    },
    {
      value: 'Canada',
      label: 'Canada',
    },
    {
      value: 'Mexico',
      label: 'Mexico',
    },
  ]

  const shippingStateOptions = isSuccess
    ? states['United States'].map((state: string) => ({
        value: state,
        label: state,
      }))
    : []

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const cartItems = getFromStorage('cart', true) || []
    let customer
    const updatedCartItems = cartItems.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      product_type: 'merch',
    }))

    if (!profile) {
      customer = await signup(data.auth).unwrap()
    }
    const orderData = {
      customer: profile?.id ? profile.id : customer?.id,
      billing_address: data.billing_address.state ? data.billing_address : null,
      // shipping_address: data.shipping_address.state ? data.shipping_address : null,
      items: updatedCartItems,
    }
    const success = await createOrder({ data: orderData }).unwrap()
    if (success) {
      removeFromStorage('cart')
      router.push(`${success.payment_link}`)
    }
    setIsLoading(false)
  }

  return (
    <div className='h-auto flex items-center flex-col'>
      <BreadCrumbs paths={paths} title={'Checkout'} />

      <div className='flex max-w-[1300px] w-full items-center justify-center pt-[70px] pb-[10px]'>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 items-center justify-center'>
          <div className='font-bold text-gray-975'>Your Cart</div>
          <div className='relative flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
              1
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold text-gray-975'>Checkout Details</div>
          <div className='flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
              2
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold' style={{ color: 'rgba(57,66,68,0.3)' }}>
            Order Complete
          </div>
          <div className='flex items-center justify-center gap-4'>
            <div
              className='w-[50px] h-[50px] font-bold rounded-full flex items-center justify-center'
              style={{ backgroundColor: 'rgba(57,66,68,0.09)', color: 'rgba(57,66,68,0.3)' }}
            >
              3
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col max-w-[1300px] w-full gap-[35px] py-[70px] relative'>
        <div className='flex max-h-[356px] relative'>
          <Image
            src={'/images/checkout-bg.webp'}
            alt={'checkout background'}
            width={1300}
            height={356}
            className='object-cover'
          />
          <h1 className='suave-text text-[80px] font-light text-white absolute bottom-10 left-[50%] translate-x-[-50%] '>
            Checkout
          </h1>
        </div>

        <div className='flex flex-col gap-[20px] pt-[55px]'>
          {!profile && (
            <>
              <div className='text-secondary-dark-gray'>
                Returning customer?{' '}
                <span className='cursor-pointer text-primary-hover-red hover:underline'>Click here to login</span>
              </div>
              <CheckoutAuth login={login} loginLoading={loginLoading} />
            </>
          )}
          <div className='text-secondary-dark-gray'>
            Have a coupon?{' '}
            <span className='cursor-pointer text-primary-hover-red hover:underline'>Click here to enter your code</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full gap-[60px]'>
            <div className='flex w-1/2 flex-col gap-4'>
              <div className='flex flex-col gap-6'>
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-2'>
                    <Label text='First name *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                    <Input
                      error={errors?.auth?.first_name}
                      type='first_name'
                      id='first_name'
                      {...register('auth.first_name', {
                        required: 'First name is required',
                        minLength: {
                          value: 2,
                          message: 'First name must be at least 2 characters long',
                        },
                        maxLength: {
                          value: 30,
                          message: 'First name must be no longer than 30 characters',
                        },
                        pattern: {
                          value: /^[^\s](.*[^\s])?$/,
                          message: 'First name cannot start or end with a space',
                        },
                      })}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors?.auth?.first_name ? 'border-red-500' : ''}`}
                    />
                    {errors?.auth?.first_name && <span className='text-red-500 text-xs'>{errors?.auth.first_name.message}</span>}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Label text='Last name' className='text-secondary-dark-gray text-[15px] !font-normal' />
                    <Input
                      error={errors?.auth?.last_name}
                      type='last_name'
                      id='last_name'
                      {...register('auth.last_name', {
                        required: 'Last name is required',
                        minLength: {
                          value: 2,
                          message: 'First name must be at least 2 characters long',
                        },
                        maxLength: {
                          value: 30,
                          message: 'First name must be no longer than 30 characters',
                        },
                        pattern: {
                          value: /^[^\s](.*[^\s])?$/,
                          message: 'First name cannot start or end with a space',
                        },
                      })}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors?.auth?.last_name ? 'border-red-500' : ''}`}
                    />
                    {errors?.auth?.last_name && <span className='text-red-500 text-xs'>{errors?.auth.last_name.message}</span>}
                  </div>
                </div>
                <div>
                  <Label text='Country / Region *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Controller
                    name='billing_address.region'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={regionOptions.find((option: TOption) => option.value === field.value)}
                        options={regionOptions}
                        onChange={option => {
                          field.onChange((option as { value: string; label: string })?.value)
                        }}
                      />
                    )}
                  />
                  {errors?.billing_address?.region && (
                    <span className='text-red-500 text-xs'>{errors?.billing_address.region.message}</span>
                  )}
                </div>
                <div>
                  <Label text='Street address *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <div className='flex flex-col gap-[10px]'>
                    <Input
                      placeholder='House number and street name'
                      {...register('billing_address.address', { required: 'Address is required' })}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none sm:text-sm ${errors?.billing_address?.address ? 'border-red-500' : ''}`}
                    />
                    {errors?.billing_address?.address && (
                      <span className='text-red-500 text-xs'>{errors?.billing_address.address?.message}</span>
                    )}

                    <Input
                      placeholder='Apartment, suite, unit, etc. (optional)'
                      {...register('billing_address.apartment')}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none sm:text-sm ${errors?.billing_address?.apartment ? 'border-red-500' : ''}`}
                    />
                    {errors?.billing_address?.apartment && (
                      <span className='text-red-500 text-xs'>{errors?.billing_address?.apartment.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label text='Town / City *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Input
                    {...register('billing_address.city', { required: 'Address is required' })}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none sm:text-sm ${errors?.billing_address?.city ? 'border-red-500' : ''}`}
                  />
                  {errors?.billing_address?.city && (
                    <span className='text-red-500 text-xs'>{errors?.billing_address?.city.message}</span>
                  )}
                </div>
                <div>
                  <Label text='State / County *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Controller
                    name='billing_address.state'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={shippingStateOptions.find((option: TOption) => option.value === field.value) || null}
                        options={shippingStateOptions}
                        placeholder='State'
                        onChange={option => field.onChange((option as { value: string; label: string })?.value)}
                      />
                    )}
                  />
                </div>
                <div className='flex flex-col gap-1 w-full '>
                  <Label text='Postcode / ZIP *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Input
                    error={errors?.billing_address?.zip_code}
                    id='billing_address.zip_code'
                    type='text'
                    {...register('billing_address.zip_code', {
                      required: 'Zip code is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Zip code must be a number',
                      },
                      minLength: {
                        value: 4,
                        message: 'Zip code must be at least 4 characters long',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Zip code must be no longer than 10 characters',
                      },
                    })}
                    className={`h-10 border-secondary-gray mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none sm:text-sm ${errors?.billing_address?.zip_code ? 'border-red-500' : ''}`}
                  />
                  {errors?.billing_address?.zip_code && (
                    <span className='text-red-500 text-xs'>{errors?.billing_address?.zip_code.message}</span>
                  )}
                </div>
                <div className='flex flex-col gap-1'>
                  <Label text='Phone *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Controller
                    name='auth.phone'
                    control={control}
                    rules={{
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\s()-]+$/,
                        message:
                          'Please enter a valid phone number containing only numbers, spaces, parentheses, dashes, and the plus sign',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Phone number must be at most 20 characters long',
                      },
                    }}
                    render={({ field }) => (
                      <MaskedInput
                        {...field}
                        mask='+000 000 000 0000'
                        id='auth.phone'
                        type='text'
                        className={`${
                          errors?.auth?.phone ? 'border-red-500' : ''
                        } flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none
                          mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none`}
                      />
                    )}
                  />
                  {errors?.auth?.phone && <span className='text-red-500 text-xs'>{errors?.auth?.phone.message}</span>}
                </div>
                <div className='flex flex-col gap-1'>
                  <Label text='Email address *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                  <Input
                    type='auth.email'
                    id='email'
                    {...register('auth.email', {
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
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors?.auth?.email ? 'border-red-500' : ''}`}
                  />
                  {errors?.auth?.email && <span className='text-red-500 text-xs'>{errors?.auth.email.message}</span>}
                </div>
                {!profile && (
                  <div className='flex flex-col gap-1'>
                    <Label text='Create account password *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                    <div className='relative'>
                      <Input
                        placeholder='Password'
                        type={'password'}
                        id='auth.password'
                        maxLength={20}
                        {...register('auth.password', {
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
                            if (!/[A-Z]/.test(value)) {
                              return 'Password must contain at least one uppercase letter'
                            }
                            if (!/[0-9]/.test(value)) {
                              return 'Password must contain at least one number'
                            }
                            if (!/[!@*]/.test(value)) {
                              return 'Password must contain at least one symbol (!@*)'
                            }
                            return true
                          },
                        })}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300
                     rounded-md shadow-sm focus:outline-none sm:text-sm ${errors?.auth?.password ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {password && (
                      <ul className='mt-2 text-sm text-gray-600'>
                        <li className={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                          {password.length >= 8 ? '✓' : '✕'} use 8 or more characters
                        </li>
                        <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          {/[A-Z]/.test(password) ? '✓' : '✕'} use one English uppercase letter (A-Z)
                        </li>
                        <li className={/[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          {/[0-9]/.test(password) ? '✓' : '✕'} use at least one number (0-9)
                        </li>
                        <li className={/[!@*]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          {/[!@*]/.test(password) ? '✓' : '✕'} use at least one symbol (!@*)
                        </li>
                      </ul>
                    )}
                  </div>
                )}

                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='different_address'
                    className='form-checkbox'
                    checked={showDifferentAddress}
                    onChange={() => setShowDifferentAddress(!showDifferentAddress)}
                  />
                  <label htmlFor='different_address' className='text-[15px] text-secondary-dark-gray'>
                    Ship to a different address?
                  </label>
                </div>

                {showDifferentAddress && (
                  <div className='flex flex-col w-full gap-[30px]'>
                    <div>
                      <Label text='Country / Region *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                      <Controller
                        name='shipping_address.region'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={customStyles}
                            value={regionOptions.find((option: TOption) => option.value === field.value)}
                            options={regionOptions}
                            onChange={option => {
                              field.onChange((option as { value: string; label: string })?.value)
                              setValue('shipping_address.region', '')
                            }}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label text='Street address *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                      <div className='flex flex-col gap-[10px]'>
                        <Input
                          placeholder='House number and street name'
                          {...register('shipping_address.address', { required: 'Address is required' })}
                        />
                        <Input
                          placeholder='Apartment, suite, unit, etc. (optional)'
                          {...register('shipping_address.apartment', { required: 'Address is required' })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label text='Town / City *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                      <Input {...register('shipping_address.city', { required: 'Address is required' })} />
                    </div>
                    <div>
                      <Label text='State / County *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                      <Controller
                        name='shipping_address.state'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            styles={customStyles}
                            value={shippingStateOptions.find((option: TOption) => option.value === field.value) || null}
                            options={shippingStateOptions}
                            placeholder='State'
                            onChange={option => field.onChange((option as { value: string; label: string })?.value)}
                          />
                        )}
                      />
                    </div>
                    <div className='flex flex-col gap-1 w-full '>
                      <Label text='Postcode / ZIP *' className='text-secondary-dark-gray text-[15px] !font-normal' />
                      <Input
                        error={errors?.shipping_address?.zip_code}
                        id='zipCode'
                        type='text'
                        className='h-10 border-secondary-gray'
                        {...register('shipping_address.zip_code', {
                          required: 'Zip code is required',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Zip code must be a number',
                          },
                          minLength: {
                            value: 4,
                            message: 'Zip code must be at least 4 characters long',
                          },
                          maxLength: {
                            value: 10,
                            message: 'Zip code must be no longer than 10 characters',
                          },
                        })}
                      />
                    </div>
                  </div>
                )}
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Order notes (optional)' className='text-primary-gray text-base font-bold' />
                  <Textarea
                    name='comment'
                    placeholder='Notes about your order, e.g. special notes for delivery.'
                    className='w-full h-[100px] p-2 border border-secondary-gray rounded-md resize-none outline-none focus:ring-1 focus:ring-transparent resize-y	'
                  />
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <CheckoutSummary isValid={isValid} loading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
