import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FaceForm from './FaceForm/FaceForm'

export const metadata = {
  title: 'MYX Blend Bar',
  description: 'Welcome to the MYX Blend Bar - the perfect blend of style and luxury.',
}

const BookingPage = () => {
  return (
    <div className='flex flex-col'>
      <div
        className='w-screen h-screen bg-cover bg-center sm:px-[15px] sm:py-[35px]'
        style={{ backgroundImage: "url('/images/booking-bg.webp')" }}
      ></div>
      <div className='flex bg-primary-brown justify-center pt-[2.188rem] px-[3.75rem] pb-[7.5rem] sm:px-[15px] sm:py-[35px]'>
        <div className='px-[0.938rem] py-[0.625rem] flex gap-[1.875rem] md:flex-col sm:flex-col sm:px-[15px]'>
          <div className='sm:w-full'>
            <Image
              src={'/images/face-myx-booking.webp'}
              alt='logo'
              width={685}
              height={511}
              className='object-cover sm:max-w-full'
            />
          </div>
          <div className='flex flex-col gap-[1.125rem] items-center'>
            <div className='text-[3rem] text-white font-light uppercase sm:text-[24px]'>RESERVE YOUR SPOT</div>
            <FaceForm />
          </div>
        </div>
      </div>
      <div className='flex justify-center bg-primary-black pt-[2.188rem] px-[3.75rem] pb-[7.5rem] sm:px-[15px] sm:py-[35px]'>
        <div className='px-[0.938rem] py-[0.625rem] flex gap-[1.875rem] md:flex-col sm:flex-col sm:px-[15px]'>
          <div className='sm:w-full'>
            <Image src={'/images/myx-lips-booking.webp'} alt='logo' width={685} height={511} />
          </div>
          <div className='flex flex-col gap-[1.125rem] items-center'>
            <div className='text-[3rem] text-white font-light uppercase sm:text-[24px]'>RESERVE YOUR SPOT</div>
            <FaceForm isFace />
          </div>
        </div>
      </div>
      <div className='flex md:flex-col sm:flex-col'>
        <div
          className='py-[15px] pt-[2.188rem] h-[15.75rem] w-1/2 bg-cover items-center flex flex-col gap-10 md:w-full sm:w-full sm:px-[15px] sm:gap-5'
          style={{ backgroundImage: "url('/images/booking-btn-one.webp')" }}
        >
          <div className='flex items-center flex-col gap-[0.625rem]'>
            <div className='text-[2.188rem] font-light sm:text-[24px]'>BOOKING MORE THAN 10?</div>
            <div className='text-[0.938rem] font-normal'>To book parties of 10 or more please click the button below</div>
          </div>
          <Link
            href={'/booking-more-than-six'}
            className='bg-primary-red text-white flex items-center justify-center hover:bg-primary-black !rounded-none w-[8.871rem] text-[0.738rem] h-[50px] font-medium	!py-[1.25rem] px-[2.625rem]'
          >
            Click Here
          </Link>
        </div>
        <div
          className='py-[15px] pt-[2.188rem] h-[15.75rem] w-1/2 bg-cover items-center flex flex-col gap-10 md:w-full sm:w-full sm:px-[15px] sm:gap-5'
          style={{ backgroundImage: "url('/images/booking-btn-two.webp')" }}
        >
          <div className='flex items-center flex-col gap-[0.625rem]'>
            <div className='text-[2.188rem] font-light sm:text-[24px]'>MYX POP UP EXPERIENCE</div>
            <div className='text-[0.938rem] font-normal'>Book MYX for your event!</div>
          </div>
          <Link
            href={'/myx-pop-up'}
            className='bg-primary-red text-white flex items-center justify-center hover:bg-primary-black !rounded-none w-[8.871rem] text-[0.738rem] h-[50px] font-medium	!py-[1.25rem] px-[2.625rem]'
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  )
}
export default BookingPage
