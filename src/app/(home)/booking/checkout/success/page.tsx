'use client'
import BreadCrumbs from '@/app/(home)/components/BreadCrumbs/BreadCrumbs'
import SuccessSummary from '@/app/(home)/components/SuccessSummary/SuccessSummary'
import Image from 'next/image'
import React from 'react'

const SuccessCheckoutPage = () => {
  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Checkout', href: '/#' },
  ]
  return (
    <div className='h-auto flex items-center flex-col'>
      <BreadCrumbs paths={paths} title={'Checkout'} />

      <div className='flex max-w-[1200px] w-full items-center justify-center pt-[70px] pb-[10px] relative md:flex-col md:items-start md:px-[50px] md:gap-10 sm:flex-col sm:px-5 sm:gap-10'>
        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative md:w-full md:flex-row-reverse md:items-center md:justify-end sm:w-full sm:flex-row-reverse sm:items-start sm:justify-end'>
          <div className='font-bold text-gray-975'>Your Cart</div>
          <div className='flex items-center justify-center'>
            <div className='w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center z-10'>
              1
            </div>
            <div className='absolute w-[calc(50%-55px)] h-[3px] bg-primary-hover-red right-0 md:left-[24px] md:top-[56px] md:h-[14px] md:w-[3px] sm:left-[24px] sm:top-[56px] sm:h-[14px] sm:w-[3px]'></div>
          </div>
        </div>

        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative md:w-full md:flex-row-reverse md:items-center md:justify-end sm:w-full sm:flex-row-reverse sm:items-start sm:justify-end'>
          <div className='font-bold text-gray-975'>Checkout Details</div>
          <div className='flex items-center justify-center'>
            <div className=' bg-primary-hover-red absolute w-[calc(50%-55px)] h-[3px] left-0 md:left-[24px] md:bottom-[56px] md:h-[14px] md:w-[3px] sm:left-[24px] sm:bottom-[56px] sm:h-[14px] sm:w-[3px]'></div>
            <div className='w-[50px] h-[50px] rounded-full flex font-bold items-center justify-center bg-primary-hover-red text-white z-10'>
              2
            </div>
            <div className='bg-primary-hover-red absolute w-[calc(50%-55px)] h-[3px] right-0 md:left-[24px] md:top-[56px] md:h-[14px] md:w-[3px] sm:left-[24px] sm:top-[56px] sm:h-[14px] sm:w-[3px]'></div>
          </div>
        </div>

        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative md:w-full md:flex-row-reverse md:items-center md:justify-end sm:w-full sm:flex-row-reverse sm:items-start sm:justify-end'>
          <div className='font-bold text-gray-975'>Order Complete</div>
          <div className='flex items-center justify-center'>
            <div className='bg-primary-hover-red absolute w-[calc(50%-55px)] h-[3px] left-0 md:left-[24px] md:bottom-[56px] md:h-[14px] md:w-[3px] sm:left-[24px] sm:bottom-[56px] sm:h-[14px] sm:w-[3px]'></div>
            <div className='bg-primary-hover-red text-white w-[50px] h-[50px] font-bold rounded-full flex items-center justify-center z-10'>
              3
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col max-w-[1300px] w-full gap-[35px] py-[70px] relative md:px-[15px] sm:px-[15px]'>
        <div className='flex max-h-[356px] relative'>
          <Image
            src={'/images/checkout-bg.webp'}
            alt={'checkout background'}
            width={1300}
            height={356}
            className='object-cover'
          />
          <h1 className='suave-text text-[80px] font-light text-white absolute bottom-10 left-[50%] translate-x-[-50%] '>
            Checkout
          </h1>
        </div>

        <SuccessSummary />
      </div>
    </div>
  )
}

export default SuccessCheckoutPage
