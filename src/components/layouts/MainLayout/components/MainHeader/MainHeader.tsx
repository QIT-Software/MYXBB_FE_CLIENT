import { MyxIcon } from '@/components/icons'
import { mainNavigationLinks } from '@/constants/navigation'
import Link from 'next/link'
import React from 'react'

const MainHeader = () => {
  return (
    <div
      className='relative bg-cover bg-center bg-no-repeat h-screen'
      style={{ backgroundImage: "url('/images/slide-one.jpg')" }}
    >
      <div className='flex px-[75px] py-[80px]'>
        <div className='w-full flex gap-8 items-center justify-end'>
          {mainNavigationLinks.map(item => (
            <Link
              href={item.link}
              key={item.name}
              className='hover:text-secondary-hover ease-in text-xs uppercase text-white font-black tracking-[1px]'
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={'/profile'}
            className='flex items-center text-white size-8 justify-center cursor-pointer bg-white/40 rounded-full'
          >
            <MyxIcon name='user' className='size-5' />
          </Link>
        </div>
      </div>
      <div className='absolute bottom-[190px] left-[50%] text-white translate-x-[-50%] uppercase text-6xl suave-text'>
        Make your Mark
      </div>
      <div className='absolute bottom-[115px] cursor-pointer left-[50%] text-white translate-x-[-50%] uppercase w-[320px] bg-white/25 hover:bg-white/50 py-[22px] px-[60px] rounded-[55px]'>
        <div className='text-xs font-black text-white tracking-[4px]'>Reserve Your Spot</div>
      </div>
    </div>
  )
}

export default MainHeader
