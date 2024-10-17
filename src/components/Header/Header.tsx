import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Navigation from '../Navigation/Navigation'

const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 && !pathname.includes('/profile'))
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (pathname !== '/booking/shop-custom') {
    return (
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-primary-black'}`}>
        <div
          className={`flex flex-col items-center  w-full  ${
            isScrolled
              ? 'gap-[1.75rem] h-[186px] pt-[2.188rem] justify-between'
              : ' justify-center gap-[3.5rem] h-[205px] pt-[4.375rem]'
          } transition-all duration-300`}
        >
          <div>
            <Image
              src={isScrolled ? '/images/logo-black-text.webp' : '/images/site-logo.png'}
              alt='logo'
              width={250}
              height={40}
            />
          </div>
          <Navigation isScrolled={isScrolled} />
        </div>
      </div>
    )
  }

  return null
}

export default Header
