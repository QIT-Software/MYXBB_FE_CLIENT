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

      <div className='flex max-w-[1300px] w-full items-center justify-center pt-[70px] pb-[10px]'>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 items-center justify-center'>
          <div className='font-bold text-gray-975'>Your Cart</div>
          <div className='relative flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
              1
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold text-gray-975'>Checkout Details</div>
          <div className='flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
              2
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold text-gray-975'>Order Complete</div>
          <div className='flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
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
