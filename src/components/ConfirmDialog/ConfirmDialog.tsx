import React, { Children } from 'react'
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog/Alert-Dialog'
import clsx from 'clsx'

type TConfirmAlertProps = {
  trigger?: string
  description?: string
  children: React.ReactNode
  submit: () => void
  title: string
  submitText: string
  showCheckbox?: boolean
}

const ConfirmDialog = ({ trigger, children, submit, description, title, submitText }: TConfirmAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='flex gap-2'>
        {children}
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={
          'flex flex-col gap-8 sm:right-0 sm:left-0 sm:top-auto sm:bottom-0 sm:transform-none sm:max-w-full sm:items-center'
        }
      >
        <AlertDialogHeader className='flex flex-col gap-6'>
          <AlertDialogTitle className={clsx('text-lg font-semibold sm:text-center')}>{title}</AlertDialogTitle>
          <AlertDialogDescription className={clsx('text-base sm:text-center')}>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={'flex flex-row gap-4 justify-center sm:w-full'}>
          <AlertDialogAction className={clsx('min-w-[200px] sm:w-full')} onClick={submit}>
            {submitText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog
