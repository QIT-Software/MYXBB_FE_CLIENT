import React, { ReactNode } from 'react'
import Header from '@/components/Header/Header'
import Footer from './components/Footer/Footer'
import { usePathname } from 'next/navigation'
import MainHeader from './components/MainHeader/MainHeader'
import ThirdHeader from './components/ThirdHeader/ThirdHeader'
import { useGetProfileQuery } from '@/api/Auth'
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: profile } = useGetProfileQuery({})

  const pathname = usePathname()

  return (
    <div className='flex flex-col'>
      {pathname === '/' ? (
        <MainHeader />
      ) : pathname === '/contact' ? (
        <ThirdHeader />
      ) : pathname === '/myxperience' ? (
        <></>
      ) : (
        <Header />
      )}

      <div className='flex '>
        <ScrollToTopButton />
        <div className='w-full'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
