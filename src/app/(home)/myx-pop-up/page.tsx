'use client'
import { useCreateAppointmentRequestMutation, useCreatePopUpInquiryMutation, useGetTimeSlotsQuery } from '@/api/Appointments'
import { useGetStatesQuery } from '@/api/Locations'
import { useGetLocationsQuery, useGetServicesQuery } from '@/api/Services'
import { DatePicker } from '@/components/DatePicker/DatePicker'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { TLocation, TOption } from '@/types/types'
import { MaskedInput } from 'antd-mask-input'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { StylesConfig } from 'react-select'
import ClipLoader from 'react-spinners/ClipLoader'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    // width: '176px',
    minHeight: '40px',
    marginTop: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0',
    margin: '0',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
  menu: (provided, state) => ({
    ...provided,
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    padding: '10px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

const BookingMoreThanSixPage = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date: '2024-10-14',
      time: '',
      location: '',
      party_size: 0,
      comment: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
    },
    mode: 'onChange',
  })
  const [createPopUpInquiry, { isSuccess, isLoading }] = useCreatePopUpInquiryMutation()
  const { data: locations } = useGetLocationsQuery({})
  const { data: states } = useGetStatesQuery({})

  const [stores, setStores] = useState<TOption[]>([])

  const [timeSlots, setTimeSlots] = useState<TOption[]>(
    watch('time')
      ? [{ label: watch('time'), value: watch('time') }]
      : [
          { label: '09:00 AM', value: '09:00 AM' },
          { label: '10:00 AM', value: '10:00 AM' },
          { label: '11:00 AM', value: '11:00 AM' },
          { label: '12:00 PM', value: '12:00 PM' },
          { label: '01:00 PM', value: '01:00 PM' },
          { label: '02:00 PM', value: '02:00 PM' },
          { label: '03:00 PM', value: '03:00 PM' },
          { label: '04:00 PM', value: '04:00 PM' },
          { label: '05:00 PM', value: '05:00 PM' },
          { label: '06:00 PM', value: '06:00 PM' },
        ]
  )

  useEffect(() => {
    if (locations) {
      const transformedLocations = locations.results.map((location: TLocation) => ({
        label: location.username,
        value: location.id,
      }))
      setStores(transformedLocations)
    }
  }, [locations])

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : undefined,
      }

      await createPopUpInquiry({ data: updatedData }).unwrap()
      reset()
    } catch (err: any) {}
  }

  const getStateOptions = (states: Record<string, string[]>): TOption[] => {
    if (!states || !states['United States']) return []

    return states['United States'].map((state: string) => ({
      value: state,
      label: state,
    }))
  }
  const billingStateOptions = getStateOptions(states)

  return (
    <div className='flex flex-col items-center pt-[4.375rem]'>
      <div className='flex flex-col gap-[3.625rem] pb-[2.575rem]'>
        <h1 className='text-[3.063rem] text-secondary-dark-gray suave-text'>MYX Pop Up Inquiry</h1>
        <div className='text-xl font-bold text-secondary-dark-gray text-center'>
          To reserve MYX for your event fill out the form below
        </div>
      </div>

      <div className='flex justify-center pb-[7rem] w-full max-w-[53.5rem]'>
        <form className='flex flex-col items-center w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
          {isSuccess ? (
            <div className='w-full p-4 border border-secondary-darkGreen bg-secondary-lightGreen text-secondary-darkGreen'>
              Thank for contacting us! We will be in touch with you shortly
            </div>
          ) : (
            <>
              <div className='flex items-end gap-[2.188rem] w-full'>
                <div className='flex flex-col gap-1 w-full '>
                  <Input
                    error={errors.first_name}
                    placeholder='First name'
                    className='h-10 border-secondary-gray'
                    id='first_name'
                    {...register('first_name', {
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
                  />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <Input
                    error={errors.last_name}
                    placeholder='Last name'
                    className='h-10 border-secondary-gray'
                    id='last_names'
                    {...register('last_name', {
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters long',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Last name must be no longer than 30 characters',
                      },
                      pattern: {
                        value: /^[^\s](.*[^\s])?$/,
                        message: 'Last name cannot start or end with a space',
                      },
                    })}
                  />
                </div>
              </div>
              <div className='flex items-end gap-[2.188rem] w-full'>
                <div className='flex flex-col gap-1  w-full'>
                  <Input
                    error={errors?.email}
                    type='email'
                    placeholder='Email'
                    id='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                      validate: value => /^[^\u0400-\u04FF]+$/.test(value) || 'Email must not contain Cyrillic characters',
                    })}
                    className={`h-10 mt-1 block w-full px-3 py-2 border border-secondary-gray focus:outline-none sm:text-sm ${
                      errors?.email ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <Controller
                    name='phone'
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
                        mask='+1 (000) 000-0000'
                        id='phone'
                        className='flex h-10 w-full border-secondary-gray border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none'
                      />
                    )}
                  />
                </div>
              </div>
              <div className='flex items-end gap-[2.188rem] w-full'>
                <div className='w-full flex flex-col gap-1'>
                  {/* <Label text='Reservation Date & Time' required className='text-primary-gray text-base font-bold' /> */}
                  <Controller
                    name='date'
                    control={control}
                    //@ts-ignore
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        placeholder=''
                        showIcon={false}
                        value={field.value}
                        onChange={field.onChange}
                        className='h-10 border-secondary-gray'
                        formatType='MM/dd/yyyy'
                        //@ts-ignore
                        disablePast={true}
                      />
                    )}
                    rules={{ required: 'Date is required' }}
                  />
                  {/* <span className='text-primary-gray capitalize text-[13px]'>Date</span> */}
                  {errors?.date && <span className='text-red-500'>{errors.date.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Controller
                    name={'time'}
                    control={control}
                    rules={{
                      required: 'Start time is required',
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={timeSlots.find(option => option.value === field.value)}
                        options={timeSlots}
                        placeholder='Select time'
                        onChange={option => field.onChange((option as TOption)?.value)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-5 w-full'>
                <div className='w-full flex flex-col gap-1 '>
                  <Label text='Location' required className='text-primary-gray text-base font-bold' />
                  <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        value={stores.find(option => option.value === field.value)}
                        options={stores}
                        onChange={option => field.onChange((option as TOption)?.value)}
                      />
                    )}
                  />
                  {errors?.location && <span className='text-red-500'>{errors.location.message}</span>}
                </div>
                <div className=' w-full flex flex-col gap-1 '>
                  <Input
                    error={errors?.address}
                    id='address'
                    type='text'
                    className='h-10 w-full border-secondary-gray'
                    placeholder='Address'
                    {...register('address', {
                      required: 'Address is required',
                      minLength: {
                        value: 5,
                        message: 'Address must be at least 5 characters long',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Address must be no longer than 100 characters',
                      },
                    })}
                  />
                  {errors?.address && <span className='text-red-500'>{errors.address.message}</span>}
                </div>
                <div className='flex items-end gap-[2.188rem] w-full'>
                  <div className='flex flex-col gap-1 w-full '>
                    <Input
                      error={errors?.city}
                      className='h-10 border-secondary-gray'
                      id='city'
                      type='text'
                      placeholder='City'
                      {...register('city')}
                    />
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <Controller
                      name='state'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customStyles}
                          value={billingStateOptions.find((option: TOption) => option.value === field.value) || null}
                          options={billingStateOptions}
                          placeholder='State'
                          onChange={option => field.onChange((option as { value: string | number; label: string })?.value)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className='flex items-end gap-[2.188rem] max-w-[25.625rem] w-full'>
                  <div className='flex flex-col gap-1 w-full '>
                    <Input
                      error={errors?.zip_code}
                      id='zipCode'
                      type='text'
                      className='h-10 border-secondary-gray'
                      placeholder='Zip Code'
                      {...register('zip_code', {
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

                <div className=' w-full flex flex-col gap-1 '>
                  <Input
                    error={errors.party_size}
                    className='h-10 w-full border-secondary-gray'
                    id='party_size'
                    placeholder='Size Of Party'
                    {...register('party_size', {
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
                  />
                  {errors?.party_size && <span className='text-red-500'>{errors.party_size.message}</span>}
                  <span className='text-primary-gray capitalize text-[13px]'>Must be 15 or more</span>
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Comment or Message' className='text-primary-gray text-base font-bold' />
                  <Textarea
                    {...register('comment')}
                    className='w-full h-[100px] p-2 border border-secondary-gray rounded-md resize-none outline-none focus:ring-1 focus:ring-transparent resize-y	'
                  />
                </div>
              </div>
            </>
          )}

          <div className='flex flex-col w-full gap-[2.188rem]'>
            {!isSuccess && (
              <div>
                <Button className='text-secondary-dark-gray bg-secondary-light-gray hover:bg-secondary-gray !text-base '>
                  {isLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Submit'}
                </Button>
              </div>
            )}
            <div className='flex flex-col text-primary-black gap-2.5'>
              <p>*Credit card is required for parties of 10 or more to confirm reservation</p>
              <p>*Minimum 15-20 guests for any location within a 15 mile radius of MYX</p>
              <p>
                * Minimum 20-30 guests for any location over a 15 mile radius of MYX, a possible travel fee may apply based on
                location and size of the event.
              </p>
              <p>
                *Offsite events include a custom blend product. Packaging and price may vary depending on number of products
                booked for the contracted event.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingMoreThanSixPage
