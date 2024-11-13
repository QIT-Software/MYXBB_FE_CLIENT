import { cn } from '@/lib/utils'
import React from 'react'
import { MyxIcon } from '../icons'
import { navigationLinks } from '@/constants/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavigationSidebar = ({ open, setOpen, className = '' }: any) => {
  const pathname = usePathname()

  return (
    <aside className={cn(className, 'h-screen absolute z-20 bg-gray-1025/80 right-0')}>
      <div className='relative'>
        <button
          className='absolute top-[20px] right-[20px] w-[50px] h-[50px] cursor-pointer transition-all duration-300'
          onClick={() => setOpen(!open)}
        >
          <MyxIcon name={'close'} className='w-[50px] h-[50px] text-white  hover:text-gray-700 hover:opacity-95' />
        </button>
        <div>
          <ul className='flex gap-6 flex-col pt-[200px] px-[30px] pb-[15px]'>
            {navigationLinks.map(item => (
              <li key={item.name} className={cn('uppercase text-white')}>
                <Link
                  className={`text-lg font-bold hover:text-secondary-hover ${pathname === item.link && 'text-secondary-hover'}`}
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default NavigationSidebar
