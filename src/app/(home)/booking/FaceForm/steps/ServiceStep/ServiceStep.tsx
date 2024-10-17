import { useGetLocationsQuery, useGetServicesQuery } from '@/api/Services'
import { DatePicker } from '@/components/DatePicker/DatePicker'
import Label from '@/components/ui/Label/Label'
import { cn } from '@/lib/utils'
import { TLocation, TOption } from '@/types/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    width: '176px',
    minHeight: '40px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
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
    fontWeight: 400,
    color: '#808288',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 20px)',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontWeight: 400,
    color: '#808288',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 20px)',
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
    fontWeight: 400,
    color: '#808288', // Колір тексту залишається
    padding: '10px',
    backgroundColor: state.isSelected ? 'red' : 'white', // Червоний фон для вибраного елемента
    ':hover': {
      backgroundColor: 'lightgray', // Фон при наведенні
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

type TServiceStepProps = {
  control: any
  setValue: any
  errors: any
  isFace: boolean | undefined
}

const personCountOptions: TOption[] = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
]

const ServiceStep = ({ control, setValue, errors, isFace }: TServiceStepProps) => {
  const { data: servicesList } = useGetServicesQuery({})
  const { data: locations } = useGetLocationsQuery({})

  const [services, setServices] = useState<TOption[]>([])
  const [myxServices, setMyxServices] = useState<TOption[]>([])
  const [faceServices, setFaceServices] = useState<TOption[]>([])
  const [stores, setStores] = useState<TOption[]>([])

  const selectServices = isFace ? myxServices : faceServices

  useEffect(() => {
    if (locations) {
      const transformedLocations = locations.results.map((location: TLocation) => ({
        label: location.username,
        value: location.id,
      }))
      setStores(transformedLocations)
    }

    if (servicesList) {
      const transformedServices = servicesList.results.map((service: any) => ({
        label: service.title,
        value: service.id,
      }))

      const myxFilteredServices = transformedServices.filter((service: any) => !service.label.startsWith('Face'))
      const faceFilteredServices = transformedServices.filter((service: any) => service.label.startsWith('Face'))

      setMyxServices(myxFilteredServices)
      setFaceServices(faceFilteredServices)
    }
  }, [locations, servicesList])
  return (
    <div className='flex flex-col gap-[1.688rem]'>
      <div className='flex flex-col items-center gap-10 pt-6'>
        <div className={cn('text-[1.063rem] text-primary-black', { 'text-primary-status-red': isFace })}>
          PLEASE SELECT A PACKAGE
        </div>
        <Link href={'/booking-more-than-six'} className='text-sm text-primary-status-red leading-[1.6rem] underline'>
          Booking more than 10?
        </Link>
      </div>
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
                value={stores.find(option => option.value === field.value)}
                options={stores}
                placeholder='Select location'
                onChange={option => field.onChange((option as TOption)?.value)}
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
                value={selectServices.find(option => option.value === field.value)}
                options={selectServices}
                placeholder='Select service'
                onChange={option => field.onChange((option as TOption)?.value)}
              />
            )}
          />
          {errors?.service && <span className='text-red-500'>{errors.service.message}</span>}
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <Label text='# In Party' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
          <Controller
            name='total_number_of_persons'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={customStyles}
                value={personCountOptions.find(option => option.value === field.value)}
                options={personCountOptions}
                placeholder='Select number of persons'
                onChange={option => field.onChange((option as TOption)?.value)}
              />
            )}
          />
          {errors?.total_number_of_persons && <span className='text-red-500'>{errors.total_number_of_persons.message}</span>}
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-1/3 flex flex-col gap-1'>
          <Label text='Date' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
          <Controller
            name='date'
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                calendarRed
                value={field.value}
                onChange={field.onChange}
                placeholder='MM/DD/YYYY'
                className='h-[42px] bg-white border-none'
                formatType='MM/dd/yyyy'
                //@ts-ignore
                disablePast={true}
              />
            )}
            rules={{ required: 'Date is required' }}
          />
          {errors?.date && <span className='text-red-500'>{errors.date.message}</span>}
        </div>
      </div>
    </div>
  )
}

export default ServiceStep
