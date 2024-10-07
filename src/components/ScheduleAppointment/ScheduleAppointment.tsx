import { useEffect, useState } from 'react'
import { Calendar } from '../ui/Calendar/Calendar'
import { Button } from '../ui/Button/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog/Dialog'
import Label from '../ui/Label/Label'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup/radio-group'
import { MyxIcon } from '../icons'
import { cn } from '@/lib/utils'
import { useGetTimeSlotsQuery, usePatchSelectedAppointmentMutation } from '@/api/Appointments'
import { format, parseISO } from 'date-fns'

const ScheduleAppointment = ({ trigger, appointment }: { trigger: React.ReactNode; appointment: any }) => {
  const [patchSelectedAppointment] = usePatchSelectedAppointmentMutation()
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(parseISO(appointment.date))
  const [selectedTime, setSelectedTime] = useState('')

  const { data: timeSlot, refetch } = useGetTimeSlotsQuery(
    {
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      location: appointment.location,
      service: appointment.service,
      party_size: appointment.total_number_of_persons,
    },
    {
      skip: !open || !selectedDate,
    }
  )

  useEffect(() => {
    if (open && selectedDate) {
      refetch()
    }
  }, [selectedDate, open, refetch])

  const times = timeSlot?.map((slot: any) => slot.start_time) || []

  const handleUpdateAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time!')
      return
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    const formattedTime = selectedTime.replace(/(AM|PM)/i, '').trim()

    const updatedAppointment = {
      date: formattedDate,
      time: selectedTime,
    }

    await patchSelectedAppointment({
      id: appointment.id,
      data: updatedAppointment,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='max-w-[728px] w-full px-[64px] h-auto'>
        <DialogHeader>
          <DialogTitle className='text-[32px]'>Schedule</DialogTitle>
          <div>
            Please select a new day and time for your service appointment. Ensure it fits your schedule to avoid further changes.
          </div>
        </DialogHeader>
        <div className='flex gap-10'>
          <Calendar
            selected={selectedDate}
            onSelect={(date: any) => {
              setSelectedDate(date)
              setSelectedTime('')
            }}
            className='w-full'
          />
          <div className='max-w-[134px] w-full'>
            <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className='flex flex-col gap-1'>
              {times.length ? (
                times.map((time: string) => (
                  <div
                    key={time}
                    className={cn(
                      'h-[54px] max-w-[134px] w-full border flex gap-2 items-center px-[18px] py-[17px]',
                      selectedTime === time ? 'bg-black text-white border-black' : 'border-gray-300'
                    )}
                    onClick={() => setSelectedTime(time)} // Оновлюємо selectedTime при кліку
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full flex items-center justify-center',
                        selectedTime === time ? 'bg-red-500' : 'border border-gray-400'
                      )}
                    >
                      {selectedTime === time && <div className='w-2 h-2 bg-red-500 rounded-full'></div>}
                    </div>
                    <div>{time}</div>
                  </div>
                ))
              ) : (
                <div>No available times</div>
              )}
            </RadioGroup>
          </div>
        </div>
        <p className='flex gap-[10px] items-center text-sm text-gray-500 mt-4 bg-secondary-white py-[11px] px-3 text-primary-black'>
          <MyxIcon name='info' className='w-5 h-5' />
          If you wish to cancel your appointment, please contact us at +1 (972)-349-9599
        </p>
        <DialogFooter className='flex gap-6 flex-row items-center w-full justify-center'>
          <Button onClick={handleUpdateAppointment}>Update appointment</Button>
          <Button variant='blackUnderline'>Do not update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleAppointment
