'use client'

import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function RedCalender({ className, classNames, showOutsideDays = true, selected, ...props }: any) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      captionLayout={'dropdown-years'}
      showOutsideDays={showOutsideDays}
      mode='single'
      className={cn('p-3 bg-primary-status-red rounded-lg text-white', className)}
      classNames={{
        root: `${defaultClassNames.root} shadow-lg p-5`,
        chevron: `${defaultClassNames.chevron} fill-amber-500`,
        ...classNames,
      }}
      {...props}
    />
  )
}

export default RedCalender
RedCalender.displayName = 'RedCalender'

export { RedCalender }
