import { useGetTimeSlotsQuery } from '@/api/Appointments'
import RedCalender from '@/components/RedCalendar/RedCalendar'
import Calendar from '@/components/ui/Calendar/Calendar'
import { RadioGroup } from '@/components/ui/RadioGroup/radio-group'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { useState } from 'react'

type TTimeStep = {
  watch: any
  setValue: any
  register: any
  errors: any
}
const TimeStep = ({ watch, setValue, errors }: TTimeStep) => {
  const selectedDate = watch('date')
  const selectedTime = watch('time')

  const location = watch('location')
  const service = watch('service')
  const party_size = watch('total_number_of_persons')

  const { data: timeSlot, refetch } = useGetTimeSlotsQuery(
    {
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      location,
      service,
      party_size,
    },
    {
      skip: !selectedDate,
    }
  )

  const times = timeSlot?.map((slot: any) => slot.start_time) || []

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 items-center mb-[3.125rem]'>
        <div className='text-center text-sm text-primary-gray'>
          Below you can find a list of available time slots for FACE MYX MUSE.
          <br /> Click on a time slot to proceed with your reservation.
          <br /> *Don&apos;t see a spot? Please call
        </div>
        <Link href={'/booking-more-than-six'} className='text-sm text-primary-status-red leading-[1.6rem] underline'>
          Dallas 972-349-9599
        </Link>
        <Link href={'/booking-more-than-six'} className='text-sm text-primary-status-red leading-[1.6rem] underline'>
          Houston 713-393-7262
        </Link>
      </div>
      <div>
        <div className='flex gap-10'>
          <RedCalender
            selected={selectedDate}
            onSelect={(date: Date) => {
              setValue('date', date)
              setValue('time', '')
            }}
            className='max-w-[19.25rem] w-full h-max h-[14.5rem]'
          />
          <div className='max-w-[7.25rem] w-full h-full'>
            <RadioGroup value={selectedTime} onValueChange={time => setValue('time', time)} className='flex flex-col gap-1'>
              {times.length ? (
                times.map((time: string) => (
                  <div
                    key={time}
                    className={cn(
                      'w-full h-9 flex items-center justify-between px-4 py-2 border rounded-lg cursor-pointer transition-colors',
                      selectedTime === time
                        ? 'border-red-500 bg-white text-red-500'
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
                    )}
                    onClick={() => setValue('time', time)}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-5 h-5 rounded-full border transition-colors',
                        selectedTime === time ? 'border-red-500' : 'border-gray-300'
                      )}
                    >
                      {selectedTime === time && <div className='w-3 h-3 bg-red-500 rounded-full'></div>}
                    </div>
                    <div className='text-sm font-normal'>{time}</div>
                  </div>
                ))
              ) : (
                <div>No available times</div>
              )}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeStep
