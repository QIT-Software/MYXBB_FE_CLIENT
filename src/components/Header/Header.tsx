import Image from 'next/image'
import React from 'react'
import Navigation from '../Navigation/Navigation'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  if (pathname !== '/booking-more-than-six') {
    return (
      <div className='bg-primary-black flex flex-col gap-[3.5rem] pt-[4.375rem] items-center justify-center w-full h-[205px]'>
        <div>
          <Image src={'/images/site-logo.png'} alt='logo' width={220} height={50} />
        </div>
        <Navigation />
      </div>
    )
  }

  return null
}

export default Header
