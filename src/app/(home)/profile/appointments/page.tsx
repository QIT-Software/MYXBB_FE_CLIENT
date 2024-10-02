'use client'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'
import ScheduleAppointment from '@/components/ScheduleAppointment/ScheduleAppointment'
import { Button } from '@/components/ui/Button/Button'
import { getUser } from '@/redux/slices/user/selectors'
import { isAfter, isBefore, parseISO } from 'date-fns'
import { get } from 'http'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const AppointmentPage = () => {
  const profile = useSelector(getUser)

  const [status, setStatus] = useState<'Upcoming' | 'Past'>('Upcoming')

  const upcomingList = profile?.appointments.filter((appointment: any) => {
    const appointmentDateTime = new Date(parseISO(appointment.date))
    const [hours, minutes] = appointment.time.split(/:| /)
    const period = appointment.time.split(' ')[1]
    const isPM = period === 'PM' && hours !== '12'
    appointmentDateTime.setHours(Number(hours) + (isPM ? 12 : 0), Number(minutes))

    return isAfter(appointmentDateTime, new Date())
  })

  const pastList = profile?.appointments.filter((appointment: any) => {
    const appointmentDateTime = new Date(parseISO(appointment.date))
    const [hours, minutes] = appointment.time.split(/:| /)
    const period = appointment.time.split(' ')[1]
    const isPM = period === 'PM' && hours !== '12'
    appointmentDateTime.setHours(Number(hours) + (isPM ? 12 : 0), Number(minutes))

    return isBefore(appointmentDateTime, new Date())
  })

  const listToDisplay = status === 'Upcoming' ? upcomingList : pastList

  const generateGoogleCalendarLink = (appointment: any) => {
    const baseUrl = 'https://calendar.google.com/calendar/r/eventedit'
    const params = new URLSearchParams({
      text: appointment.service_title, // Event title
      details: `Service: ${appointment.service_title}\nPersons: ${appointment.total_number_of_persons}
      \nNotes: ${appointment.notes}`,
      location: appointment.location_title, // Location
      dates: `${formatDateForGoogle(appointment.date, appointment.time)}/${formatDateForGoogle(
        appointment.date,
        appointment.finish_time
      )}`, // Start/End in Google Calendar format
    })

    return `${baseUrl}?${params.toString()}`
  }

  const formatDateForGoogle = (date: any, time: any) => {
    const [hours, minutes] = time.split(/:| /)
    const period = time.split(' ')[1]
    const isPM = period === 'PM' && hours !== '12'
    const appointmentDateTime = new Date(date)
    appointmentDateTime.setHours(Number(hours) + (isPM ? 12 : 0), Number(minutes))
    return appointmentDateTime.toISOString().replace(/-|:|\.\d{3}/g, '') // Google Calendar format
  }

  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='My Appointments' />
      {profile?.appointments?.length ? (
        <div className='flex flex-col gap-5'>
          <div className='w-max flex rounded-lg overflow-hidden border border-gray-300'>
            <Button
              className={`!h-max !py-[7px] text-base font-semibold flex items-center justify-center ${
                status === 'Upcoming' ? 'bg-black text-white' : 'bg-white text-gray-600'
              }`}
              onClick={() => setStatus('Upcoming')}
            >
              Upcoming
            </Button>
            <Button
              className={`!h-max !py-[7px] text-base font-semibold flex items-center justify-center ${
                status === 'Past' ? 'bg-black text-white' : 'bg-white text-gray-600'
              }`}
              onClick={() => setStatus('Past')}
            >
              Past
            </Button>
          </div>
          {listToDisplay &&
            listToDisplay.map((appointment: any) => (
              <div className='flex flex-col border border-secondary-black-blue' key={appointment.id}>
                <div className='flex justify-between p-5'>
                  <div className='flex flex-col gap-6 items-start'>
                    <div className='flex gap-8 items-center justify-center'>
                      <div className='flex gap-2 max-w-[88px] w-full items-center'>
                        <MyxIcon name='pin' className='size-5' />
                        <span className='text-base'>WHERE</span>
                      </div>
                      <div className='flex flex-col gap-2 font-semibold'>
                        <span>{appointment.location_title}</span>
                        <span>
                          {appointment.address.city}, {appointment.address.state}
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-8 items-center justify-center'>
                      <div className='flex gap-2 max-w-[88px] w-full items-center'>
                        <MyxIcon name='clock' className='size-5' />
                        <span className='text-base'>WHEN</span>
                      </div>
                      <div className='flex flex-col gap-2 font-semibold'>
                        <span>{appointment.date}</span>
                        <span>
                          {appointment.time} - {appointment.finish_time}
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-8 items-center justify-center'>
                      <div className='flex gap-2 max-w-[88px] w-full items-center'>
                        <MyxIcon name='event' className='size-5' />
                        <span className='text-base'>WHAT</span>
                      </div>
                      <div className='flex flex-col gap-2 font-semibold'>
                        <p>{appointment.service_title}</p>
                        <p>{appointment.total_number_of_persons} persons</p>
                      </div>
                    </div>
                  </div>
                  {status === 'Upcoming' && (
                    <div className='flex gap-6'>
                      <ScheduleAppointment appointment={appointment} trigger={<MyxIcon name='edit' className='size-5' />} />
                    </div>
                  )}
                </div>
                {status === 'Upcoming' && (
                  <div className='flex px-5 py-[11px] border-t border-secondary-light-grey justify-end'>
                    <Button onClick={() => window.open(generateGoogleCalendarLink(appointment), '_blank')}>
                      Add to Google Calendar
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className='flex mt-20 flex-col gap-10 items-center justify-center'>
          <div className='flex flex-col gap-4 items-center'>
            <div className='text-lg font-semibold'>No reservations yet? Let’s change that!</div>
            <div>Book your first service today and receive your unique lipstick</div>
          </div>
          <div>
            <Button>Go to reserve your spot</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentPage
