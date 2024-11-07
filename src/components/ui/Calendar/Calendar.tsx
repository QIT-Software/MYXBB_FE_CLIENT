'use client'

import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button/Button'
import { MyxIcon } from '@/components/icons'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, selected, ...props }: any) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      captionLayout={'dropdown-years'}
      showOutsideDays={showOutsideDays}
      mode='single'
      classNames={{
        root: `${defaultClassNames.root} shadow-lg p-5`,
        chevron: `${defaultClassNames.chevron} fill-amber-500`,
        ...classNames,
      }}
      {...props}
    />
  )
}

export default Calendar
Calendar.displayName = 'Calendar'

export { Calendar }
