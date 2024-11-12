import { Button } from '@/components/ui/Button/Button'
import Link from 'next/link'
import React from 'react'

const AboutSection = () => {
  return (
    <div className='w-full bg-gray-450'>
      <div className='flex flex-col pt-[8.125rem] md:pt-[90px] gap-15 items-center pb-[5.625rem] md:px-[42px]'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-4 items-center'>
            <div className='uppercase text-gray-700 tracking-[5px] text-[57px] font-light suave-text md:text-[36px]'>
              About MYX Blend bar
            </div>
            <div className='w-[78px] border-2 border-secondary-main-red'></div>
          </div>
          <div className='text-gray-700 text-lg md:text-center'>
            At MYX Blend Bar, we invite you to MYX it up! From subtle to sassy, your smile is your canvas.
          </div>
        </div>

        <Link
          href={'/about'}
          className='bg-primary-red text-white hover:bg-primary-black rounded-[55px] text-xs tracking-[4px] uppercase py-5 !px-[29px] font-black mt-[60px]'
        >
          Learn More
        </Link>
      </div>
      <div className='flex w-full bg-white h-[770px] md:flex-col md:h-auto'>
        <Link
          href={'/'}
          style={{ backgroundImage: "url('/images/about-link-four.webp')" }}
          className='relative w-1/2 bg-cover bg-center bg-no-repeat md:w-full'
        >
          <div className='w-full flex flex-col gap-[2.188rem] text-white absolute items-center left-1/2 -translate-x-1/2  bottom-[50%] translate-y-1/2 md:relative md:py-[120px]'>
            <div className='flex flex-col'>
              <div className='w-full text-center suave-text font-light uppercase text-5xl tracking-[2.5px]'>MYXPERIENCE</div>
              <div className='max-w-[455px] w-full text-[21px] text-white text-center leading-[48px]'>
                Each MYXperience is tailored to you! Create your perfect custom lip product today!
              </div>
            </div>
            <div className='cursor-pointer text-xs text-white uppercase max-w-[337px] w-full bg-white/25 hover:bg-white/50 py-[20px] px-[29px] rounded-[55px]'>
              <div className='text-xs font-black text-white tracking-[4px]'>Explore the MYXperience</div>
            </div>
          </div>
        </Link>
        <div className='p-[2.188rem] flex flex-col gap-[2.188rem] w-1/2 md:w-full md:p-[35px] md:h-full'>
          <div className='flex flex-row gap-8 w-full max-h-[250px] md:h-[250px]'>
            <Link
              href={'/'}
              className='relative w-1/2 h-[15.625rem] hover:scale-[1.03] h-full bg-cover bg-center bg-no-repeat'
              style={{ backgroundImage: "url('/images/about-link-one.webp')" }}
            >
              <div className='w-full flex flex-col text-white uppercase text-2xl tracking-[2.5px] font-light absolute left-1/2 -translate-x-1/2  bottom-[20px]'>
                <div className='w-full text-center suave-text'>
                  Choose Your <br /> MYX
                </div>
              </div>
            </Link>
            <Link
              href={'/'}
              className='relative w-1/2 hover:scale-[1.03] h-[15.625rem] h-full bg-cover bg-center bg-no-repeat'
              style={{ backgroundImage: "url('/images/about-link-two.webp')" }}
            >
              <div className='flex flex-col text-white uppercase text-2xl tracking-[2.5px] font-light absolute left-[20px] bottom-[20px]'>
                <div className='w-full text-center suave-text'>MYX It Up</div>
              </div>
            </Link>
          </div>
          <Link
            href={'/'}
            className='relative h-[415px] hover:scale-[1.03] bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: "url('/images/about-link-three.webp')" }}
          >
            <div className='flex flex-col text-white uppercase text-2xl tracking-[2.5px] font-light absolute left-[20px] bottom-[20px]'>
              <div className='w-full text-center suave-text'>Make it yours</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
