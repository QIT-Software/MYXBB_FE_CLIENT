'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button/Button'
import { MyxIcon } from '@/components/icons'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function RedCalender({ className, classNames, showOutsideDays = true, selected, onSelect, ...props }: any) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      selected={selected}
      onDayClick={onSelect}
      className={cn('p-3 bg-primary-status-red rounded-lg text-white', className)}
      classNames={{
        months: 'flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-between items-center pt-1 px-4',
        caption_label: 'text-sm font-semibold text-center text-white',
        nav: 'flex space-x-2 items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-white p-0 opacity-70 hover:opacity-100 rounded-full text-red-500'
        ),
        nav_button_previous: 'left-1',
        nav_button_next: 'right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'grid grid-cols-7 gap-2 mb-2',
        head_cell: 'text-white text-sm font-semibold w-full text-center',
        row: 'grid grid-cols-7 gap-2 w-full',
        cell: 'h-[1.563rem] w-full text-center text-sm p-0 relative',
        day: cn(
          buttonVariants({ variant: null }),
          'w-10 h-[1.563rem] p-0 text-sm font-normal rounded text-white hover:border hover:border-white'
        ),
        day_range_end: 'day-range-end',
        day_selected: 'bg-primary-red text-primary-red',
        day_today: 'bg-blue-200 text-blue-900',
        day_outside: 'text-gray-400 opacity-50',
        day_disabled: 'text-gray-400 opacity-30',
        day_range_middle: 'bg-red-300 text-red-700',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <svg {...props} width='14' height='14' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M15 19l-7-7 7-7' />
          </svg>
        ),
        IconRight: ({ ...props }) => (
          <svg {...props} width='14' height='14' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M9 19l7-7-7-7' />
          </svg>
        ),
      }}
      {...props}
    />
  )
}

export default RedCalender
RedCalender.displayName = 'RedCalender'

export { RedCalender }
