import { MyxIcon } from '@/components/icons'
import { mainNavigationLinks } from '@/constants/navigation'
import { getUser } from '@/redux/slices/user/selectors'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const ThirdHeader = () => {
  const pathname = usePathname()

  return (
    <div className='flex justify-center items-center py-10 bg-gray-25'>
      <nav className='w-full flex items-center justify-between gap-6 px-[75px]'>
        <Link href={'/'} className='w-[250px] h-[35px]'>
          <Image src={'/images/logo-black-text.webp'} alt='logo' width={250} height={35} className='object-contain h-[35px]' />
        </Link>
        <div className='flex gap-8'>
          {mainNavigationLinks.map(item => (
            <Link
              href={item.link}
              key={item.name}
              className={`transition-all duration-300 hover:text-secondary-hover text-xs uppercase text-primary-black font-bold tracking-widest, ${
                pathname === item.link && 'text-secondary-hover'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default ThirdHeader
