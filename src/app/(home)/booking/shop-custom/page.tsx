import { MyxIcon } from '@/components/icons'
import ShopButton from '@/components/ShopButton/ShopButton'
import Image from 'next/image'
import React from 'react'

const CustomShopPage = () => {
  return (
    <div className='flex flex-col py-[4.375rem] w-full'>
      <div className='flex items-center justify-center px-[3.125rem]'>
        <div className='max-w-[1300px] w-full'>
          <div className='z-[2] text-[4.375rem] text-primary-black font-bold text-center suave-text pb-[7.25rem] relative'>
            Shop MYX
            <div className='z-[1] absolute top-[37%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[190px] w-full border-b border-primary-gray'></div>
          </div>

          {/* primary item */}
          <div className='flex justify-center items-center max-w-[1200px] w-full gap-7'>
            <div className='flex w-1/2'>
              <Image src={'/images/auth-bg.webp'} alt='custom shop' width={585} height={585} />
            </div>
            <div className='w-1/2 flex flex-col gap-[2.188rem] text-center'>
              <div className='flex flex-col gap-2.5'>
                <h1 className='suave-text text-[3.125rem] text-center text-primary-black font-bold'>BALMSHELL LIP BALM</h1>
                <p className='text-[1.25rem] font-bold text-primary-black'>Our Miracle Lip Perfecter.</p>
                <p className='text-2xl font-bold text-primary-gray'>
                  A blend of peptides naturally increase collagen production, creating a naturally plumper lip, improving moisture
                  and smoothing fine lines.
                </p>
              </div>
              <div className='flex items-center justify-center'>
                <ShopButton link='/' />
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='z-[2] text-[3.438rem] text-primary-black font-bold text-center suave-text pb-[7.25rem] relative'>
              Lipstick
              <div className='z-[1] absolute top-[37%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[190px] w-full border-b border-primary-gray'></div>
            </div>
            <div className='flex flex-col items-center gap-[15px]'>
              <div className='max-w-[18.625rem] w-full relative'>
                <Image src={'/images/auth-bg.webp'} alt='custom shop' width={585} height={585} />
                <div>
                  <MyxIcon name='shop' />
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='text-[0.938rem] hover:text-primary-hover-red cursor-pointer'>Berry Delish (Liquid Matte)</div>
                <div>$35.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomShopPage
