import { MyxIcon } from '@/components/icons'
import NavigationSidebar from '@/components/NavigationSidebar/NavigationSidebar'
import { mainNavigationLinks } from '@/constants/navigation'
import { getUser } from '@/redux/slices/user/selectors'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ThirdHeader = () => {
  const profile = useSelector(getUser)
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <NavigationSidebar open={open} setOpen={setOpen} className='md:w-[500px] sm:w-full' />}

      <div className='flex md:hidden sm:hidden justify-center items-center py-10 bg-gray-25'>
        <nav className='w-full flex items-center justify-between gap-6 px-[75px]'>
          <Link href={'/'} className='w-[250px] h-[35px]'>
            <Image src={'/images/logo-black-text.webp'} alt='logo' width={250} height={35} className='object-contain h-[35px]' />
          </Link>
          <div className='flex gap-8'>
            {mainNavigationLinks.map(item => (
              <Link
                href={item.link}
                key={item.name}
                className={`transition-all duration-300 hover:text-secondary-hover
                 text-xs uppercase text-primary-black font-bold tracking-widest, ${
                   pathname === item.link && 'text-secondary-hover'
                 }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className='hidden md:flex sm:flex justify-between items-center py-[20px] pr-[20px] bg-gray-25'>
        <Link href={'/'} className='w-[250px] h-[35px]'>
          <Image src={'/images/logo-black-text.webp'} alt='logo' width={250} height={35} className='object-contain h-[35px]' />
        </Link>
        <nav className='w-full flex items-end justify-end gap-2'>
          <Link
            href='/profile'
            className={`ml-6 size-8 overflow-hidden flex items-center
                   justify-center bg-white/40 rounded-full cursor-pointer ${!profile?.avatar && 'opacity-25'}`}
          >
            {profile?.avatar ? (
              <Image src={profile?.avatar} alt='avatar' width={40} height={40} className='rounded-full' />
            ) : (
              <MyxIcon name='user' className='w-[18px] h-[18px] flex items-center justify-center text-white' />
            )}
          </Link>
          <button onClick={() => setOpen(true)}>
            <MyxIcon name='menu' className='w-[32px] h-[32px] flex items-center justify-center text-primary-black' />
          </button>
        </nav>
      </div>
    </>
  )
}

export default ThirdHeader
