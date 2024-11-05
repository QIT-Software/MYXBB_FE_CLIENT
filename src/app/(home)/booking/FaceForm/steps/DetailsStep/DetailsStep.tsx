import { DatePicker } from '@/components/DatePicker/DatePicker'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { getUser } from '@/redux/slices/user/selectors'
import { MaskedInput } from 'antd-mask-input'
import React, { use } from 'react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'

type TDetailsStepProps = {
  register: any
  errors: any
  watch: any
  setValue: any
  control: any
  showForm: boolean
  setShowForm: any
}
const DetailsStep = ({ register, errors, watch, setValue, control, setShowForm, showForm }: TDetailsStepProps) => {
  const profile = useSelector(getUser)
  return (
    <>
      {!profile ? (
        <div className='flex flex-col gap-[1.688rem] items-center'>
          <div className='text-center text-sm text-primary-gray'>
            <Button onClick={() => setShowForm(!showForm)} className='uppercase bg-primary-status-red'>
              {showForm ? 'Cancel' : 'Login'}
            </Button>
          </div>
          <div className='flex gap-3 w-full'>
            <div className='flex flex-col gap-1 w-full items-center'>
              <Label text='First name' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Input
                error={errors.contact_info?.first_name}
                className='h-10 text-sm text-gray-850 font-normal'
                id='first_name'
                {...register('contact_info.first_name', {
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
            <div className='flex flex-col gap-1 w-full items-center'>
              <Label text='Last name' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Input
                error={errors.contact_info?.last_name}
                className='h-10 text-sm text-gray-850 font-normal'
                id='last_name'
                {...register('contact_info.last_name', {
                  required: 'Last name is required',
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
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1 items-center'>
              <Label text='Phone' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Controller
                name='contact_info.phone'
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
                    mask='+0 (000) 000-0000'
                    placeholder={'+x (xxx) xxx-xxxx'}
                    id='phone'
                    className='flex h-10 w-full font-normal rounded-md border px-3 py-3 text-sm text-gray-850 outline-none mt-1 border-gray-300 focus:outline-none'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <Label text='Email' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Input
                error={errors.contact_info?.email}
                type='email'
                id='email'
                {...register('contact_info.email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                  validate: (value: any) => /^[^\u0400-\u04FF]+$/.test(value) || 'Email must not contain Cyrillic characters',
                })}
                className={`h-10 mt-1 block text-sm font-normal text-gray-850 w-full px-3 py-2 border border-gray-300
               rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.contact_info?.email ? 'border-red-500' : ''}`}
              />
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <Label text='Confirm email' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Input
                error={errors.confirm_email}
                type='email'
                id='confirm_email'
                {...register('confirm_email', {
                  required: 'Please confirm your email',
                  validate: (value: any) => {
                    if (value !== watch('contact_info.email')) {
                      return 'Emails do not match'
                    }
                    if (!/^[^\u0400-\u04FF]+$/.test(value)) {
                      return 'Email must not contain Cyrillic characters'
                    }
                    return true
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={`h-10 mt-1 text-sm text-gray-850 font-normal block w-full px-3 py-2 border border-gray-300
               rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.confirm_email ? 'border-red-500' : ''}`}
              />
            </div>
          </div>
          <div className='flex gap-3 w-full'>
            <div className='w-full flex flex-col gap-1 items-center'>
              <Label text='Date of birth' className='!text-primary-status-red !text-sm !font-bold leading-[1.6rem]' />
              <Controller
                name='contact_info.birthdate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendarRed
                    value={field.value}
                    onChange={field.onChange}
                    className='h-10 bg-white border-none'
                    placeholder='MM/DD/YYYY'
                    formatType='MM/dd/yyyy'
                  />
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>You already logging in with {profile?.email}, go to next step</div>
        </div>
      )}
    </>
  )
}

export default DetailsStep
