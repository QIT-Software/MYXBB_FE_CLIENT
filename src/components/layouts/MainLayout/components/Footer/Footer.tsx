import { MyxIcon } from '@/components/icons'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-secondary-black-blue max-h-[341px] h-full py-16'>
      <div className='flex flex-col gap-8 items-center justify-center h-full text-white'>
        <Image src={'/images/footer-image.webp'} alt='logo' width={77} height={40} />
        <div className='flex flex-col gap-5'>
          <div className='flex gap-3 text-xs font-semibold leading-8 tracking-[0.25rem] uppercase'>
            <span>© 2024 MYX Blend Bar</span>
            <span>|</span>
            <span>All rights reserved.</span>
          </div>
          <div className='flex gap-3 text-xs font-semibold leading-8'>
            <span>3699 McKinney Ave</span>
            <span>|</span>
            <span>Suite 302</span>
            <span>|</span>
            <span>Dallas TX 75204</span>
            <span>|</span>
            <span>1(972)-349-9599</span>
          </div>
        </div>
        <div className='flex gap-6'>
          <MyxIcon name='grayInstagram' className='w-6 h-6 cursor-pointer' />
          <MyxIcon name='grayFacebook' className='w-6 h-6 cursor-pointer' />
          <MyxIcon name='grayTwitter' className='w-6 h-6 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Footer
