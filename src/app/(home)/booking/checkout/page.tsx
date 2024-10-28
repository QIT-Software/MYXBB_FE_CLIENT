'use client'
import React, { useState } from 'react'
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
  const [showDifferentAddress, setShowDifferentAddress] = useState(false)
  const [createOrder, { isLoading }] = useCreateOrderMutation()
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
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      region: '',
      address: '',
      comment: '',
      company_name: '',
      street_name: '',
      apartment: '',
      city: '',
      state: '',
      zip_code: '',
    },
    mode: 'onChange',
  })
  const password = watch('password')

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
    console.log('here')
    const obj = {
      billing_address: {
        region: 'United States',
        state: 'Aguascalientes',
        city: 'string',
        address: 'string',
        zip_code: 'string',
        apartment: 'string',
      },
      // shipping_address: {
      //   region: 'United States',
      //   state: 'Aguascalientes',
      //   city: 'string',
      //   address: 'string',
      //   zip_code: 'string',
      //   apartment: 'string',
      // },
      items: [
        {
          product_type:  'merch', // product type field in custom blends
          product_id: 'ad46fd39-a1ad-4049-9581-e44585445c61',
          quantity: 2,
          // gift_card_item_price: '-98',
          // gift_card_recipient_email: 'user@example.com',
        },
      ],
      customer: 'b388f2e9-2aa9-4cb1-aa8e-f3270a5d0e40',
    }
    console.log(obj)
    await createOrder({ data: obj }).unwrap()
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
          <div className='text-secondary-dark-gray'>
            Returning customer? <span className='cursor-pointer text-primary-hover-red hover:underline'>Click here to login</span>
          </div>
          <div className='text-secondary-dark-gray'>
            Have a coupon?
            <span className='cursor-pointer text-primary-hover-red hover:underline'>Click here to enter your code</span>
          </div>
        </div>

        <div className='flex w-full gap-[60px]'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex w-1/2 flex-col gap-4'>
            <Button variant={'redSubmit'} type='submit'>
              Test
            </Button>
          </form>
          <div className='w-1/2'>
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
