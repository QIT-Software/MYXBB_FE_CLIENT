'use client'

import React, { useState } from 'react'
import { format, isBefore, startOfDay } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button/Button'
import { Calendar } from '@/components/ui/Calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover/Popover'
import { MyxIcon } from '../icons'
import RedCalender from '../RedCalendar/RedCalendar'

type TDatePickerProps = {
  value: string | null
  onChange: (date: string | null) => void
  placeholder: string
  className?: string
  formatType?: string
  showIcon?: boolean
  disablePast?: boolean
  calendarRed?: boolean
}
export function DatePicker({
  value,
  onChange,
  disablePast,
  placeholder,
  className,
  calendarRed,
  showIcon = true,
  formatType = 'MM/dd',
}: TDatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const today = startOfDay(new Date())

  const handleSelectDate = (date: any) => {
    console.log(date, 'date')
    const selectedDate = startOfDay(date)
    if (disablePast && isBefore(selectedDate, today)) {
      return
    }
    onChange(date)
    setIsPopoverOpen(false)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'light'}
          className={cn('w-full text-gray-300 justify-start flex gap-3.5 text-left font-normal', className)}
        >
          {showIcon && <MyxIcon name='calendar' width={20} height={20} />}
          {value ? (
            <span className='text-gray-850 text-sm'>{format(new Date(value), formatType)}</span>
          ) : (
            <span className='text-gray-850 text-sm'>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-white w-auto p-0' align='start'>
        {/* @ts-ignore */}
        {calendarRed ? (
          <RedCalender
            mode='single'
            selected={value}
            onSelect={handleSelectDate}
            disabled={(date: any) => disablePast && isBefore(startOfDay(date), today)}
            initialFocus
          />
        ) : (
          <Calendar
            mode='single'
            selected={value as any}
            onSelect={handleSelectDate}
            className='!bg-white'
            disabled={(date: any) => disablePast && isBefore(startOfDay(date), today)}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
