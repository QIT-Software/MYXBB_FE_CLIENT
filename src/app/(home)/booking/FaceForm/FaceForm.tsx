'use client'
import { useGetTimeSlotsQuery } from '@/api/Appointments'
import { useGetStatesQuery } from '@/api/Locations'
import Calendar from '@/components/ui/Calendar/Calendar'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { TOption } from '@/types/types'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    width: '176px',
    minHeight: '40px',
    marginTop: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0',
    margin: '0',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
}

const FaceForm = () => {
  const { data: states, isSuccess } = useGetStatesQuery({})

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      service: '',
      party_size: '',
      date: '',
    },
    mode: 'onChange',
  })

  const getStateOptions = (region: string, states: Record<string, string[]>): TOption[] => {
    if (!states || !region) return []
    return (
      states[region]?.map((state: string) => ({
        value: state,
        label: state,
      })) || []
    )
  }

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
  return (
    <div className='flex flex-col gap-[1.2rem] items-center'>
      <div className='flex font-bold text-sm leading-[1.625rem] text-primary-gray'>
        <div className='flex flex-col gap-1 items-center'>
          <div className='text-primary-status-red'>1. Service</div>
          <div className='rounded-l-[5px] h-[15px] w-[6.563rem] bg-primary-status-red'></div>
        </div>
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div>2. Time</div>
          <div className='h-[15px] w-[6.563rem] bg-gray-800'></div>
        </div>
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div>3. Details</div>
          <div className='h-[15px] w-[6.563rem] bg-gray-800'></div>
        </div>
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div>4. Confirmation</div>
          <div className='h-[15px] w-[6.563rem] bg-gray-800'></div>
        </div>
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div>5. Done</div>
          <div className='rounded-r-[5px] h-[15px] w-[6.563rem] bg-gray-800'></div>
        </div>
      </div>
      <div className='flex flex-col font-bold items-center gap-[1.6rem] text-[1.063rem] text-primary-black'>
        <div>PLEASE SELECT A PACKAGE:</div>
        <div className='flex items-center'>
          <Link href={'/'} className='text-sm text-primary-status-red leading-[1.6rem] underline'>
            Booking more than 6?
          </Link>
        </div>
        <div>
          <form>
            <div className='flex flex-col gap-[1.688rem]'>
              <div className='flex gap-[0.875rem] w-[34.125rem]'>
                <div className='flex flex-col gap-1 items-center'>
                  <Label text='Location' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
                  <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={regionOptions.find((option: TOption) => option.value === field.value)}
                        options={regionOptions}
                        placeholder='Select location'
                        onChange={option => {
                          field.onChange((option as { value: string; label: string })?.value)
                          setValue('location', '')
                        }}
                      />
                    )}
                  />
                  {errors?.location && <span className='text-red-500'>{errors.location.message}</span>}
                </div>
                <div className='flex flex-col gap-1 items-center'>
                  <Label text='Service' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
                  <Controller
                    name='service'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={regionOptions.find((option: TOption) => option.value === field.value)}
                        options={regionOptions}
                        placeholder='Select service'
                        onChange={option => {
                          field.onChange((option as { value: string; label: string })?.value)
                          setValue('service', '')
                        }}
                      />
                    )}
                  />
                  {errors?.service && <span className='text-red-500'>{errors.service.message}</span>}
                </div>
                <div className='flex flex-col gap-1 items-center'>
                  <Label text='# In Party' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
                  <Controller
                    name='party_size'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={regionOptions.find((option: TOption) => option.value === field.value)}
                        options={regionOptions}
                        placeholder='Party size'
                        onChange={option => {
                          field.onChange((option as { value: string; label: string })?.value)
                          setValue('party_size', '')
                        }}
                      />
                    )}
                  />
                  {errors?.party_size && <span className='text-red-500'>{errors.party_size.message}</span>}
                </div>
              </div>
              <div>
                <div className='flex flex-col gap-1 items-center'>
                  <Label text='Date' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
                  <Controller
                    name='date'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={regionOptions.find((option: TOption) => option.value === field.value)}
                        options={regionOptions}
                        placeholder='Select date'
                        onChange={option => {
                          field.onChange((option as { value: string; label: string })?.value)
                          setValue('date', '')
                        }}
                      />
                    )}
                  />
                  {errors?.date && <span className='text-red-500'>{errors.date.message}</span>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FaceForm
