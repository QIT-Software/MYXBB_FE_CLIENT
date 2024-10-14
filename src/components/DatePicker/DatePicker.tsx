'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button/Button'
import { Calendar } from '@/components/ui/Calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover/Popover'
import { MyxIcon } from '../icons'

type TDatePickerProps = {
  value: string | null
  onChange: (date: string | null) => void
  placeholder: string
  className?: string
  formatType?: string
  showIcon?: boolean
}
export function DatePicker({ value, onChange, placeholder, className, showIcon = true, formatType = 'MM/dd' }: TDatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleSelectDate = (date: any) => {
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
            <span className='text-black'>{format(new Date(value), formatType)}</span>
          ) : (
            <span className='text-gray-300'>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {/* @ts-ignore */}
        <Calendar
          fromYear={2000}
          toYear={2030}
          mode='single'
          selected={value}
          onSelect={handleSelectDate}
          initialFocus
          className='bg-white'
        />
      </PopoverContent>
    </Popover>
  )
}
