import { MyxIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        `w-full bg-secondary-black-blue h-full sm:px-[15px] sm:py-10`,
        pathname === '/' ? 'max-h-[21.313rem] py-16 sm:max-h-auto' : 'max-h-[3.75rem py-[1.125rem] sm:max-h-auto'
      )}
    >
      <div className='flex flex-col gap-8 items-center justify-center h-full text-white sm:gap-[30px]'>
        {pathname === '/' ? (
          <Image src={'/images/footer-image.webp'} alt='logo' width={77} height={40} className='sm:w-[60px] sm:h-[30px]' />
        ) : (
          <Image src={'/images/site-logo.png'} alt='logo' width={150} height={24} className='sm:w-[60px] sm:h-[30px]' />
        )}
        {pathname === '/' && (
          <>
            <div className='flex flex-col gap-5'>
              <div className='flex gap-3 text-xs font-semibold leading-8 tracking-[0.25rem] uppercase sm:flex-col sm:gap-0 sm:tracking-[4px] sm:leading-3 sm:text-center sm:font-normal'>
                <span>© 2024 MYX Blend Bar</span>
                <span className='sm:hidden'>|</span>
                <span>All rights reserved.</span>
              </div>
              <div className='flex gap-3 text-xs font-semibold leading-8 sm:gap-0 sm:tracking-[4px] sm:leading-3 sm:text-center sm:font-normal sm:flex-wrap sm:items-center sm:justify-center'>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Footer
