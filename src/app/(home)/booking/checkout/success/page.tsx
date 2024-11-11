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

      <div className='flex max-w-[1200px] w-full items-center justify-center pt-[70px] pb-[10px] relative'>
        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative'>
          <div className='font-bold text-gray-975'>Your Cart</div>
          <div className='flex items-center justify-center'>
            <div className='w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center z-10'>
              1
            </div>
            <div className='absolute w-[calc(50%-55px)] h-[3px] bg-primary-hover-red right-0'></div>
          </div>
        </div>

        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative'>
          <div className='font-bold text-gray-975'>Checkout Details</div>
          <div className='flex items-center justify-center'>
            <div className='absolute w-[calc(50%-55px)] h-[3px] left-0 bg-primary-hover-red'></div>
            <div className='w-[50px] h-[50px] bg-primary-hover-red text-white rounded-full flex font-bold items-center justify-center z-10'>
              2
            </div>
            <div className='absolute w-[calc(50%-55px)] h-[3px] right-0 bg-primary-hover-red'></div>
          </div>
        </div>

        <div className='w-1/3 text-2xl flex flex-col items-center gap-2.5 relative'>
          <div className='font-bold text-gray-975'>Order Complete</div>
          <div className='flex items-center justify-center'>
            <div className='absolute w-[calc(50%-55px)] h-[3px] left-0 bg-primary-hover-red'></div>
            <div className='w-[50px] h-[50px] font-bold rounded-full flex items-center bg-primary-hover-red text-white justify-center z-10'>
              3
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col max-w-[1300px] w-full gap-[35px] py-[70px] relative'>
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
