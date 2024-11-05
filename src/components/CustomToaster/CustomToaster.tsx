import React from 'react'
import { MyxIcon } from '../icons'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

type TCustomToasterProps = {
  message: string
  variant: 'success' | 'error'
  dismiss?: () => void
}
const CustomToaster = ({ message, variant, dismiss }: TCustomToasterProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={dismiss}
        className={cn('flex w-[286px] absolute top-2 right-2 items-center px-4 py-3 border shadow-lg rounded ', {
          'bg-secondary-lightGreen text-secondary-darkGreen border-gray-200': variant === 'success',
          'bg-secondary-red border-system-error text-system-error': variant === 'error',
        })}
      >
        <MyxIcon name={variant === 'success' ? 'status' : 'warning'} width={22} height={22} className='flex-shrink-0' />
        <span className='ml-2 text-sm'>{message}</span>
      </button>
    </div>
  )
}

const showToast = ({ message, variant }: any) => {
  let toastId = ''
  if (toastId !== '') {
    toast.dismiss(toastId)
  }

  toastId = toast(<CustomToaster message={message} variant={variant} />, {
    duration: 4000,
  })
}

export default showToast
