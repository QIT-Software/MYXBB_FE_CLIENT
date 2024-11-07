'use client'
import { useLoginMutation } from '@/api/Auth'
import { showToast } from '@/components/CustomToast/CustomToast'
import { Button } from '@/components/ui/Button/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog/Dialog'
import { Input } from '@/components/ui/Input/Input'
import { TLoginForm } from '@/types/types'
import { DialogClose } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'
import ClipLoader from 'react-spinners/ClipLoader'

type TAuthDialogProps = {
  handleClose: () => void
  open: boolean
}
const AuthDialog = ({ open, handleClose }: TAuthDialogProps) => {
  const [login, { isLoading }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({
    mode: 'onChange',
  })

  const onSubmit = async (data: TLoginForm) => {
    try {
      await login(data).unwrap()
      showToast({ message: `Login successful`, variant: 'success' })
      reset()
      handleClose()
    } catch (err: any) {
      const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
      showToast({ message: `Failed: ${errorMessage}`, variant: 'error' })
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='lg:max-w-[778px] sm:max-w-[425px] px-10 pt-10 flex flex-col gap-6 top-[50px] bottom-[50px] translate-y-0 max-h-max h-[calc(100vh-50px-50px)] overflow-y-scroll sm:left-0 sm:top-auto sm:bottom-0 sm:transform-none sm:max-w-full sm:items-center sm:px-4 pb-4 pt-8'>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-2xl'>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Input
            placeholder='Phone or email *'
            type='email'
            id='email'
            {...register('email', {
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
            className={`mt-1 block w-full px-3 py-2 border text-[15px] text-gray-850 border-secondary-dark-gray/1
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
          />
          <Input
            placeholder='Password *'
            type={'password'}
            id='password'
            maxLength={20}
            {...register('password', {
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
                return true
              },
            })}
            className={`mt-1 block w-full px-3 py-2 text-[15px] text-gray-850 border border-secondary-dark-gray/1
                   rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
          />
          <DialogFooter className='flex flex-row gap-4 items-end justify-end pt-4'>
            <DialogClose asChild className='sm:w-1/3'>
              <Button variant='outlineBlack'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={!isValid} className='sm:w-2/3'>
              {isLoading ? <ClipLoader color='white' size={20} /> : 'Login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
