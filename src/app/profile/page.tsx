'use client'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TProfileDetails } from '@/types/types'
import { Controller, useForm } from 'react-hook-form'
import Label from '@/components/ui/Label/Label'
import { Input } from '@/components/ui/Input/Input'
import { MaskedInput } from 'antd-mask-input'
import { Button } from '@/components/ui/Button/Button'
import { useGetProfileQuery, usePatchAvatarMutation, usePatchProfileMutation } from '@/api/Auth'
import { DatePicker } from '@/components/DatePicker/DatePicker'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { getUser } from '@/redux/slices/user/selectors'
import { current } from '@reduxjs/toolkit'
import { showToast } from '@/components/CustomToast/CustomToast'
import ClipLoader from 'react-spinners/ClipLoader'

type TPasswordChange = {
  current_password: string
  new_password: string
  confirm_password: string
}

const ProfilePage = () => {
  const [patchProfile, { isLoading }] = usePatchProfileMutation()
  const [patchAvatar, { isLoading: isLoadingAvatar }] = usePatchAvatarMutation()

  const profile = useSelector(getUser)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<TProfileDetails>({
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      birthdate: profile?.birthdate || '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        birthdate: profile.birthdate || '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: TProfileDetails) => {
    try {
      const processedData = {
        ...data,
        phone: data.phone.replace(/\s+/g, ''),
        birthdate: data.birthdate ? format(new Date(data.birthdate), 'yyyy-MM-dd') : undefined,
      }

      if (selectedFile) {
        const avatar = new FormData()
        avatar.append('avatar', selectedFile)
        await patchAvatar(avatar).unwrap()
      }

      delete processedData.avatar
      await patchProfile(processedData).unwrap()
      showToast({ message: 'Personal information successfully updated', variant: 'success' })
    } catch (err: any) {
      const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
      showToast({ message: `Failed to update personal information: ${errorMessage}`, variant: 'error' })
    }
  }

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword, isValid },
  } = useForm<TPasswordChange>({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  })

  const generateInitials = () => {
    if (!profile) return 'N/A'
    const firstInitial = profile.first_name ? profile.first_name[0].toUpperCase() : ''
    const lastInitial = profile.last_name ? profile.last_name[0].toUpperCase() : ''
    return `${firstInitial}${lastInitial}`
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  const onSubmitPasswordChange = async (data: TPasswordChange) => {
    // delete data?.new_password
    const payload = {
      old_password: data.current_password,
      password: data.new_password,
    }
    try {
      await patchProfile(payload).unwrap()
      showToast({ message: 'Personal information successfully updated', variant: 'success' })
    } catch (err: any) {
      const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
      showToast({ message: `Failed to update personal information: ${errorMessage}`, variant: 'error' })
    }
  }

  const password = watchPassword('new_password')

  return (
    <div className='flex w-full h-full flex-col gap-8'>
      <PageHeader title='My Profile' />
      <div className='flex flex-col flex-row'>
        <div className='flex flex-col gap-5'>
          <div className='uppercase text-primary-black text-base'>Profile photo</div>
          <div className='flex gap-4 items-center'>
            <div className='w-[96px] h-[96px] rounded-full bg-gray-200 flex items-center justify-center'>
              {selectedFile ? (
                <Image
                  width={96}
                  height={96}
                  src={URL.createObjectURL(selectedFile)}
                  alt='Profile photo'
                  className='w-full h-full object-cover rounded-full'
                />
              ) : profile?.avatar ? (
                <Image
                  width={96}
                  height={96}
                  src={profile.avatar}
                  alt='Profile photo'
                  className='w-full h-full object-cover rounded-full'
                />
              ) : (
                <span className='text-white text-2xl font-bold'>{generateInitials()}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <div className='cursor-pointer font-semibold text-primary-black' onClick={() => fileInputRef.current?.click()}>
                <div className='flex gap-2 items-center'>
                  {/* <MyxIcon name='plus' className='w-4 h-4' /> */}
                  <div className='font-bold text-base'>Upload photo</div>
                </div>
                <div className='text-gray-500 text-sm'>Photo should be at least 300px × 300px</div>
              </div>
              <input
                type='file'
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
                id='file-input'
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-7 mt-8 md:flex-col'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex md:max-w-[361px] max-w-[750px] w-full flex-col gap-5 md:max-w-full sm:max-w-full'
          >
            <div className='uppercase text-primary-black text-base'>Basic information</div>
            <div className='flex flex-row md:flex-col sm:flex-col gap-7 w-full mb-10'>
              <div className='flex flex-col gap-7 w-full max-w-[361px] sm:w-full'>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='First name' required />
                  <Input
                    error={errors.first_name}
                    placeholder='First name'
                    {...register('first_name', {
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters long' },
                      maxLength: { value: 30, message: 'First name must be no longer than 30 characters' },
                      pattern: { value: /^[^\s](.*[^\s])?$/, message: 'First name cannot start or end with a space' },
                    })}
                  />
                  {errors.first_name && <span className='text-red-500 text-xs'>{errors.first_name.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Last name' required />
                  <Input
                    error={errors.last_name}
                    placeholder='Last name'
                    {...register('last_name', {
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters long' },
                      maxLength: { value: 30, message: 'Last name must be no longer than 30 characters' },
                      pattern: { value: /^[^\s](.*[^\s])?$/, message: 'Last name cannot start or end with a space' },
                    })}
                  />
                  {errors.last_name && <span className='text-red-500 text-xs'>{errors.last_name.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Email' required />
                  <Input
                    error={errors.email}
                    placeholder='Please enter your email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
                      validate: value => /^[^\u0400-\u04FF]+$/.test(value) || 'Email must not contain Cyrillic characters',
                    })}
                  />
                  {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Phone number' />
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <MaskedInput
                        {...field}
                        mask='+000 000 000 0000'
                        placeholder='+xxx (xxx) xxx-xxxx'
                        className='flex h-[42px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300'
                      />
                    )}
                  />
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Date of birth' />
                  <Controller
                    name='birthdate'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        formatType='MM/dd/yyyy'
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='MM/DD/yyyy'
                      />
                    )}
                  />
                </div>
                <div className='flex gap-6 md:hidden'>
                  <Button type='submit' className='w-[144px] sm:w-full'>
                    {isLoadingAvatar || isLoading ? <ClipLoader size={20} color='white' /> : 'Update profile'}
                  </Button>
                  <Button type='button' variant={'blackUnderline'} onClick={() => reset()}>
                    Cancel
                  </Button>
                </div>
              </div>

              <div className='md:flex md:flex-row-reverse md:justify-between md:items-center md:gap-4'>
                <div className='flex max-w-[361px] w-full flex-col gap-5 md:mt-0 md:w-full sm:mt-0 sm:w-full sm:max-w-full'>
                  {showPasswordForm ? (
                    <form onSubmit={handleSubmitPassword(onSubmitPasswordChange)} className='flex flex-col gap-5'>
                      <div className='flex flex-col gap-7 w-full sm:w-full'>
                        {/* Current Password */}
                        <div className='w-full flex flex-col gap-1'>
                          <Label text='Current Password' required />
                          <div className='relative'>
                            <Input
                              error={errorsPassword.current_password}
                              placeholder='Current Password'
                              type={showCurrentPassword ? 'text' : 'password'}
                              //@ts-ignore
                              {...registerPassword('current_password', {
                                required: 'Current password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                validate: value => {
                                  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
                                  if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
                                  if (!/[!@*]/.test(value)) return 'Password must contain at least one symbol (!@*)'
                                  return true
                                },
                              })}
                            />
                            <button
                              type='button'
                              onClick={() => setShowCurrentPassword(prev => !prev)}
                              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                            >
                              {showCurrentPassword ? (
                                <MyxIcon name='eye' width={16} height={16} />
                              ) : (
                                <MyxIcon name='eyeOff' width={16} height={16} />
                              )}
                            </button>
                          </div>
                          {errorsPassword.current_password && (
                            <span className='text-red-500 text-xs'>{errorsPassword.current_password.message}</span>
                          )}
                        </div>

                        {/* New Password */}
                        <div className='w-full flex flex-col gap-1'>
                          <Label text='New Password' required />
                          <div className='relative'>
                            <Input
                              error={errorsPassword.new_password}
                              placeholder='New Password'
                              type={showNewPassword ? 'text' : 'password'}
                              {...registerPassword('new_password', {
                                required: 'New password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                validate: value => {
                                  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
                                  if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
                                  if (!/[!@*]/.test(value)) return 'Password must contain at least one symbol (!@*)'
                                  return true
                                },
                              })}
                            />
                            <button
                              type='button'
                              onClick={() => setShowNewPassword(prev => !prev)}
                              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                            >
                              {showNewPassword ? (
                                <MyxIcon name='eye' width={16} height={16} />
                              ) : (
                                <MyxIcon name='eyeOff' width={16} height={16} />
                              )}
                            </button>
                          </div>
                          {errorsPassword.new_password && (
                            <span className='text-red-500 text-xs'>{errorsPassword.new_password.message}</span>
                          )}
                        </div>

                        {/* Confirm New Password */}
                        <div className='w-full flex flex-col gap-1'>
                          <Label text='Confirm New Password' required />
                          <div className='relative'>
                            <Input
                              error={errorsPassword.confirm_password}
                              placeholder='Confirm New Password'
                              type={showConfirmPassword ? 'text' : 'password'}
                              {...registerPassword('confirm_password', {
                                required: 'Please confirm your new password',
                                validate: value => value === watchPassword('new_password') || 'Passwords do not match',
                              })}
                            />
                            <button
                              type='button'
                              onClick={() => setShowConfirmPassword(prev => !prev)}
                              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                            >
                              {showConfirmPassword ? (
                                <MyxIcon name='eye' width={16} height={16} />
                              ) : (
                                <MyxIcon name='eyeOff' width={16} height={16} />
                              )}
                            </button>
                          </div>
                          {errorsPassword.confirm_password && (
                            <span className='text-red-500 text-xs'>{errorsPassword.confirm_password.message}</span>
                          )}
                        </div>

                        <div className='flex gap-6'>
                          <Button type='submit' className='w-[171px] sm:w-full' disabled={!isValid}>
                            Change password
                          </Button>
                          <Button
                            type='button'
                            variant={'blackUnderline'}
                            onClick={() => {
                              resetPassword()
                              setShowPasswordForm(false)
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div
                      className='cursor-pointer font-semibold font-base text-primary-black md:flex md:items-end md:justify-end'
                      onClick={() => setShowPasswordForm(true)}
                    >
                      Change password
                    </div>
                  )}
                </div>
                <div className='hidden gap-6 md:flex'>
                  <Button type='submit' className='w-[144px] sm:w-full'>
                    {isLoadingAvatar || isLoading ? <ClipLoader size={20} color='white' /> : 'Update profile'}
                  </Button>
                  {isDirty && (
                    <Button type='button' variant={'blackUnderline'} onClick={() => reset()}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
