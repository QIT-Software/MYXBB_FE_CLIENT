'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Button } from '@/components/ui/Button/Button'
import { useLazyFacebookAuthQuery, useLazyGoogleAuthQuery, useLoginMutation } from '@/api/Auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { TLoginForm } from '@/types/types'
import ClipLoader from 'react-spinners/ClipLoader'
import { MyxIcon } from '@/components/icons'
import Link from 'next/link'
import { baseURL } from '@/api/baseUrl'
import { showToast } from '@/components/CustomToast/CustomToast'

const AuthForm = () => {
  const router = useRouter()
  const [login, { isLoading: loginLoading }] = useLoginMutation()
  const [googleAuth] = useLazyGoogleAuthQuery({})
  const [facebookAuth] = useLazyFacebookAuthQuery({})

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    if (rememberMe) {
      localStorage.setItem('myxx_email', data.email)
      localStorage.setItem('myxx_password', data.password)
      localStorage.setItem('myxx_rememberMe', 'true')
    } else {
      localStorage.removeItem('myxx_email')
      localStorage.removeItem('myxx_password')
      localStorage.removeItem('myxx_rememberMe')
    }

    try {
      await login(data).unwrap()
      router.push('/')
    } catch (err: any) {
      showToast({ message: `Failed: ${err.data.detail ? err.data?.detail : 'Something went wrong'}`, variant: 'error' })
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const response = await googleAuth({}).unwrap()
      router.push(`${response.google_login_link}`)
    } catch (err: any) {}
  }

  const handleFacebookSignup = async () => {
    try {
      const response = await facebookAuth({}).unwrap()
      router.push(`${response.facebook_login_link}`)
    } catch (err: any) {}
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <Label text='Username or Email' />
            <Input
              placeholder='Please enter your username or email'
              type='text'
              id='email'
              {...register('email', {
                required: 'Username or email is required',
                validate: value => {
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  const isUsername = /^[A-Za-z0-9 @+_-]+$/.test(value)
                  const noCyrillic = /^[^\u0400-\u04FF]+$/.test(value)

                  if (!noCyrillic) {
                    return 'Username or email must not contain Cyrillic characters'
                  }

                  if (isEmail || isUsername) {
                    return true
                  }

                  return 'Please enter a valid username or email'
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300
 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='Password' />
            <div className='relative'>
              <Input
                placeholder='Please enter your password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                maxLength={100}
                {...register('password', {
                  required: 'Password is required',
                  maxLength: {
                    value: 100,
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
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
                   rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {showPassword ? <MyxIcon name='eye' width={16} height={16} /> : <MyxIcon name='eyeOff' width={16} height={16} />}
              </button>
            </div>
            {errors.password && <span className='text-system-error text-xs'>{errors.password.message}</span>}
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-2 justify-between'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='remember'
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className='peer h-5 w-5 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary-black data-[state=checked]:text-white'
              />
              <Label text='Remember me' className={'font-normal'} />
            </div>
            <Link className='text-system-primary' href={`/auth/reset-password`}>
              Forgot password?
            </Link>
          </div>
          <Button type='submit' disabled={!isValid} className='!bg-primary-black'>
            {loginLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Sign in'}
          </Button>
        </div>
        <div className='flex gap-4 flex-col items-center justify-center'>
          <div className='w-full flex items-center justify-center'>
            <div className='w-full border-b border-gray-300'></div>
            <div className='w-full flex items-center justify-center text-secondary-black px-[7px] py-0.5'>or Sign In with</div>
            <div className='w-full border-b border-gray-300'></div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <Button type='button' variant={'outlineBlack'} className='size-8 p-2 md:p-0 sm:p-0' onClick={handleFacebookSignup}>
              <MyxIcon name='facebook' width={16} height={16} />
            </Button>
            <Button type='button' variant={'outlineBlack'} className='size-8 p-2 md:p-0 sm:p-0' onClick={handleGoogleSignup}>
              <MyxIcon name='google' width={16} height={16} className='size-4' />
            </Button>
          </div>
        </div>
      </form>
      <div className='flex gap-2 justify-center mt-[52px]'>
        Don&apos;t have an account?
        <Link className='text-system-primary' href={`/auth/register`}>
          Sign up
        </Link>
      </div>
    </div>
  )
}
export default AuthForm
