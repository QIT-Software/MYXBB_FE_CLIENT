// CustomToast.tsx
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { MyxIcon } from '../icons'

interface CustomToastProps {
  message?: string
  variant?: 'success' | 'error' | 'info'
  customContent?: React.ReactNode
}

export const showToast = ({ message, variant, customContent }: CustomToastProps) => {
  toast.remove()

  toast.custom(
    t =>
      customContent ? (
        <div onClick={() => toast.remove(t.id)}>{customContent}</div>
      ) : (
        <div
          onClick={() => toast.remove(t.id)}
          className={`flex items-center max-w-[286px] w-full p-4 rounded shadow-lg cursor-pointer ${
            variant === 'success'
              ? 'bg-secondary-lightGreen text-secondary-darkGreen border-gray-200'
              : 'bg-secondary-red border-system-error text-system-error'
          }`}
        >
          <MyxIcon name={variant === 'success' ? 'status' : 'warning'} width={22} height={22} className='flex-shrink-0' />
          <span className='ml-2 text-sm'>{message}</span>
        </div>
      ),
    { duration: 4000 }
  )
}

export const CustomToastProvider = () => <Toaster position='top-right' />
