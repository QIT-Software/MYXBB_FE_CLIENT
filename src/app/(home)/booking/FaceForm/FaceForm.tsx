'use client'
import { useAddCustomerMutation, useCreateAppointmentMutation, useGetTimeSlotsQuery } from '@/api/Appointments'
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
import ServiceStep from './steps/ServiceStep/ServiceStep'
import { Button } from '@/components/ui/Button/Button'
import DetailsStep from './steps/DetailsStep/DetailsStep'
import TimeStep from './steps/TimeStep/TimeStep'
import FinalStep from './steps/FInalStep/FinalStep'
import ClipLoader from 'react-spinners/ClipLoader'
import { cn } from '@/lib/utils'

type TFaceForm = {
  isFace?: boolean
}
const FaceForm = ({ isFace }: TFaceForm) => {
  const { data: states, isSuccess } = useGetStatesQuery({})
  const [currentStep, setCurrentStep] = useState(0)
  const [addCustomer, { data: customer, isSuccess: isSuccessCustomer, isLoading: isCreateCustomerLoading }] =
    useAddCustomerMutation()
  const [createAppointment, { data, isLoading: isAppointmentLoading }] = useCreateAppointmentMutation()

  const {
    register,
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      location: '',
      service: '',
      total_number_of_persons: '',
      date: '',
      time: '',
      contact_info: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        birthdate: '',
      },
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : undefined,
        contact_info: {
          ...data.contact_info,
          billing_address: {},
          is_shipping_address_equals_billing: true,
          birthdate: data.contact_info.birthdate ? format(new Date(data.contact_info.birthdate), 'yyyy-MM-dd') : undefined,
        },
      }

      delete updatedData.confirm_email
      const customerResponse = await addCustomer({ data: updatedData.contact_info }).unwrap()
      if (customerResponse) {
        const appointmentData = {
          date: updatedData.date,
          time: updatedData.time,
          total_number_of_persons: updatedData.total_number_of_persons,
          location: updatedData.location,
          service: updatedData.service,
          customer: customerResponse.id,
        }

        await createAppointment({ data: appointmentData }).unwrap()

        setCurrentStep(3)
      }
    } catch (err: any) {
      console.error('Error during submission: ', err)
    }
  }

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 0) {
      const { service } = watch()
      if (service) {
        setCurrentStep(prev => prev + 1)
      } else {
        alert('Please fill in all required fields before proceeding.')
      }
    } else if (currentStep === 1) {
      const { date, time } = watch()
      if (date && time) {
        setCurrentStep(prev => prev + 1)
      } else {
        alert('Please select both a date and time.')
      }
    }
  }

  const handleBackStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <div className='flex flex-col gap-[1.2rem] items-center'>
      <div className='flex font-bold text-sm leading-[1.625rem] text-primary-gray'>
        {/* Step 1 - Service */}
        <div className='flex flex-col gap-1 items-center'>
          <div className={currentStep >= 0 ? 'text-primary-status-red' : ''}>1. Service</div>
          <div
            className={`rounded-l-[5px] h-[15px] w-[6.563rem] ${currentStep >= 0 ? 'bg-primary-status-red' : 'bg-gray-800'}`}
          ></div>
        </div>

        {/* Step 2 - Time */}
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div className={currentStep >= 1 ? 'text-primary-status-red' : ''}>2. Time</div>
          <div className={`h-[15px] w-[6.563rem] ${currentStep >= 1 ? 'bg-primary-status-red' : 'bg-gray-800'}`}></div>
        </div>

        {/* Step 3 - Details */}
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div className={currentStep >= 2 ? 'text-primary-status-red' : ''}>3. Details</div>
          <div className={`h-[15px] w-[6.563rem] ${currentStep >= 2 ? 'bg-primary-status-red' : 'bg-gray-800'}`}></div>
        </div>

        {/* Step 4 - Done */}
        <div className='flex flex-col gap-1 pl-1 items-center'>
          <div className={currentStep >= 3 ? 'text-primary-status-red' : ''}>4. Done</div>
          <div
            className={`rounded-r-[5px] h-[15px] w-[6.563rem] ${currentStep >= 3 ? 'bg-primary-status-red' : 'bg-gray-800'}`}
          ></div>
        </div>
      </div>

      <div className='flex flex-col font-bold items-center gap-[1.6rem] text-[1.063rem] text-primary-black'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {currentStep === 0 && <ServiceStep isFace={isFace} control={control} setValue={setValue} errors={errors} />}
            {currentStep === 1 && (
              <TimeStep isFace={isFace} watch={watch} setValue={setValue} register={register} errors={errors} />
            )}
            {currentStep === 2 && (
              <DetailsStep register={register} errors={errors} watch={watch} setValue={setValue} control={control} />
            )}
            {currentStep === 3 && <FinalStep isFace={isFace} />}
          </div>
          {currentStep !== 3 && (
            <div className='flex justify-around pt-10'>
              {currentStep > 0 && (
                <Button
                  type='button'
                  onClick={handleBackStep}
                  className={cn('uppercase !rounded h-[39px] !text-lg !leading-[1.063rem] px-[2.063rem] !py-[0.563rem]', {
                    'bg-primary-status-red': isFace,
                  })}
                >
                  Back
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  type='button'
                  onClick={handleNextStep}
                  className='uppercase !rounded h-[39px] !text-lg !leading-[1.063rem] bg-primary-status-red px-[2.063rem] !py-[0.563rem] disabled:opacity-50'
                >
                  Next
                </Button>
              ) : (
                <Button
                  type='submit'
                  className='uppercase !rounded h-[39px] !text-lg !leading-[1.063rem] bg-primary-status-red px-[2.063rem] !py-[0.563rem]'
                >
                  {isAppointmentLoading || isCreateCustomerLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Submit'}
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default FaceForm
