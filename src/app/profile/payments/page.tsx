'use client'
import { useGetStatesQuery } from '@/api/Locations'
import PageHeader from '@/components/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { cn } from '@/lib/utils'
import { TOption } from '@/types/types'
import { MaskedInput } from 'antd-mask-input'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { StylesConfig } from 'react-select'

const selectStyles: StylesConfig<{ value: string | number; label: string }> = {
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

const PaymentsPage = () => {
  const [creditData, setCreditData] = useState<boolean>(false)
  const { data: states, isSuccess } = useGetStatesQuery({})

  const shippingStateOptions = isSuccess
    ? states['United States'].map((state: string) => ({
        value: state,
        label: state,
      }))
    : []

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      card_number: '',
      expired_date: '',
      cvc: '',
      cardholder_name: '',
      state: '',
      zip_code: '',
      save_as_default: false,
    },
  })

  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='Payment Methods' />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-lg uppercase'>Credit / Debit Card</h2>
            {!creditData ? (
              <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setCreditData(!creditData)}>
                + Add Credit Card
              </div>
            ) : (
              <div>
                <form className='flex flex-col gap-5 max-w-[365px] w-full'>
                  <div className='w-full flex flex-col gap-1'>
                    <Label text='Card number' required />
                    <Controller
                      name='card_number'
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask='0000-0000-0000-0000'
                          placeholder={'XXXX-XXXX-XXXX-XXXX'}
                          id='card_number'
                          type='text'
                          className='flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none'
                        />
                      )}
                    />
                  </div>
                  <div className='flex flex-row gap-7'>
                    <div>
                      <Label required text='Cardholder name' />
                      <Controller
                        name='expired_date'
                        control={control}
                        render={({ field }) => (
                          <MaskedInput
                            {...field}
                            mask='00/00'
                            placeholder={'MM/YY'}
                            id='expired_date'
                            type='text'
                            className='flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none'
                          />
                        )}
                      />
                      {errors?.expired_date && <span className='text-red-500'>{errors?.expired_date?.message}</span>}
                    </div>
                    <div>
                      <Label required text='Security code' />
                      <Controller
                        name='cvc'
                        control={control}
                        render={({ field }) => (
                          <MaskedInput
                            {...field}
                            mask='000'
                            placeholder={'CVC'}
                            id='expired_date'
                            type='text'
                            className='flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none'
                          />
                        )}
                      />
                      {errors?.cvc && <span className='text-red-500'>{errors?.expired_date?.message}</span>}
                    </div>
                  </div>
                  <div>
                    <Label required text='Cardholder name' />
                    <Input
                      placeholder='Please enter cardholder name'
                      {...register('cardholder_name', {
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: 'Cardholder name must contain only letters and spaces',
                        },
                        minLength: {
                          value: 2,
                          message: 'Cardholder name must be at least 2 characters long',
                        },
                        maxLength: {
                          value: 50,
                          message: 'Cardholder name must be no longer than 50 characters',
                        },
                      })}
                    />
                    {errors?.cardholder_name && <span className='text-red-500'>{errors?.cardholder_name?.message}</span>}
                  </div>
                  <div>
                    <Label required text='State' />
                    <Controller
                      name='state'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={selectStyles}
                          value={shippingStateOptions.find((option: TOption) => option.value === field.value) || null}
                          options={shippingStateOptions}
                          placeholder='State'
                          onChange={option => field.onChange((option as { value: string; label: string })?.value)}
                        />
                      )}
                    />
                    {errors?.state && <span className='text-red-500'>{errors.state.message}</span>}
                  </div>
                  <div>
                    <Label required text='Zip code' />
                    <Input
                      placeholder='Zip code'
                      {...register('zip_code', {
                        pattern: {
                          value: /^[0-9-]+$/,
                          message: 'Zip code must contain only numbers and dashes',
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
                    {errors?.zip_code && <span className='text-red-500'>{errors?.zip_code?.message}</span>}
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <Controller
                      name='save_as_default'
                      control={control}
                      render={({ field }) => (
                        <Checkbox id='save_as_default' checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                    <span className={cn('text-secondary-black')}>Set as my default card</span>
                  </div>
                  <div className='col-span-2 flex gap-4'>
                    <Button type='submit'>Save</Button>
                    <Button type='button' variant='blackUnderline' onClick={() => setCreditData(!creditData)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className='border border-secondary-light-grey'></div>
          <div className='flex flex-col gap-5'>
            <h2 className='text-lg uppercase'>Gift Card</h2>
            <div className='flex items-center'>
              <Input placeholder='Please enter gift card code' className='max-w-[260px] h-[42px] !rounded-none mt-0' />
              <Button className='h-[42px]'>Redeem Gift Card</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
