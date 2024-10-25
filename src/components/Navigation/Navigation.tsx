import React from 'react'
import { navigationLinks } from '@/constants/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type TNavigationProps = {
  isScrolled: boolean
}
const Navigation = ({ isScrolled }: TNavigationProps) => {
  const pathname = usePathname()
  return (
    <div className='flex text-secondary-white pb-[1.375rem] flex-col justify-between'>
      <ul className='flex gap-9'>
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
      {/* <div>social</div> */}
    </div>
  )
}

export default Navigation
