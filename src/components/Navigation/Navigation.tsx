import React from 'react'
import { navigationLinks } from '@/constants/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { MyxIcon } from '../icons'

type TNavigationProps = {
  isScrolled: boolean
}
const Navigation = ({ isScrolled }: TNavigationProps) => {
  const pathname = usePathname()
  return (
    <div className='flex text-secondary-white pb-[1.375rem]  justify-between'>
      <ul className='flex gap-6'>
        {navigationLinks.map(item => (
          <li key={item.name} className={cn('uppercase text-white', { '!text-primary-black': isScrolled })}>
            <Link
              className={`text-sm font-bold hover:text-primary-hover-red ${pathname === item.link && 'text-secondary-hover'}`}
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-sm flex font-bold pl-10 gap-[5px]'>
        <Link
          href={'https://www.facebook.com/MYXBlendBarDallas/'}
          className='w-[30px] h-[30px] bg-primary-hover-red rounded-full flex items-center justify-center hover:bg-white hover:text-primary-hover-red transition-all duration-100'
        >
          <MyxIcon name='facebookLetter' className='w-[16px] h-[16px]' />
        </Link>
        <Link
          href={'https://x.com/MYXBlendBar/'}
          className='w-[30px] h-[30px] border-full bg-primary-hover-red rounded-full flex items-center justify-center hover:bg-white hover:text-primary-hover-red transition-all duration-100'
        >
          <MyxIcon name='twitter' className='w-[15px] h-[15px]' />
        </Link>
        <Link
          href={'https://www.instagram.com/myxblendbar/'}
          className='w-[30px] h-[30px] border-full bg-primary-hover-red rounded-full flex items-center justify-center hover:bg-white hover:text-primary-hover-red transition-all duration-100'
        >
          <MyxIcon name='instagram' className='w-[15px] h-[15px]' />
        </Link>
        <Link
          href={'https://youtu.be/wHYwFtSkSJk?feature=shared/'}
          className='w-[30px] h-[30px] border-full bg-primary-hover-red rounded-full flex items-center justify-center hover:bg-white hover:text-primary-hover-red transition-all duration-100'
        >
          <MyxIcon name='youtube' className='w-[15px] h-[15px]' />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
