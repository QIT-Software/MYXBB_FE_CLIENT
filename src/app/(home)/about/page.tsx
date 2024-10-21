import { MyxIcon } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='flex flex-col gap-[7.5rem]'>
      <div className='flex flex-col gap-15 items-center bg-gray-25 w-full'>
        <div className='flex flex-col gap-7 pt-[50px] pb-[70px]'>
          <div className='flex flex-col gap-4 items-center relative'>
            <Image src={'/images/lips-bg.webp'} alt={'lips bg'} width={405} height={230} className='object-cover' />
            <div className='absolute top-[50%] flex flex-col items-center justify-center'>
              <h1 className='uppercase text-gray-700 tracking-[5px] text-[48px] font-light suave-text'>About MYX Blend bar</h1>
              <div className='w-[78px] border border-secondary-main-red'></div>
            </div>
          </div>
          <div className='text-gray-700 text-[21px] font-light text-center'>
            At MYX Blend Bar, we invite you to MYX It Up! From subtle to sassy, your smile is your canvas.
            <br />
            Your personalized MYXperience is all about your style and creativity.
          </div>
        </div>
        <div className='relative'>
          <Image
            src={'/images/label.png'}
            alt={'about-image-one'}
            width={145}
            height={145}
            className='object-cover absolute left-[55px] top-[40px]'
          />
          <Image src={'/images/slide-five.webp'} alt={'about-image-one'} width={1015} height={550} className='object-cover' />
          <h3 className='suave-text text-[30px] font-light absolute left-[55px] bottom-[40px] max-w-[905px] w-full text-white uppercase'>
            Lipstick is more than rouge, it's a fashion statement, an expression, and an invaluable asset that can transform your
            look.
          </h3>
        </div>
      </div>
      <div className='flex w-full'>
        <div className='max-w-[640px] w-full'>
          <Image src={'/images/slide-six.webp'} alt={'about-image-one'} width={640} height={426} className='object-cover' />
        </div>
        <div className='py-[55px] w-full flex items-center justify-center'>
          <div className='max-w-[645px] w-full flex flex-col gap-[5rem]'>
            <div className='suave-text text-[30px] font-light uppercase text-gray-700 '>
              AT MYX BLEND BAR WE REFUSE TO ALLOW YOU TO BE CONFINED BY THE LIMITATIONS OF THE COSMETIC COUNTER!
            </div>
            <div className='text-secondary-hover text-[21px] font-medium suave-text'>
              We invite you to Choose Your MYX, MYX It Up, and truly Make It Yours!
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-[2.313rem] items-center justify-center pb-[85px]'>
        <MyxIcon name='instagram' className='size-9' />
        <div className='text-[30px] suave-text hover:text-secondary-hover transition-colors cursor-pointer duration-300'>
          MYXBLENDBAR
        </div>
      </div>
    </div>
  )
}

export default AboutPage
