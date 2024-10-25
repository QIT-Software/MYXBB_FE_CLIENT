import React, { ReactNode } from 'react'
import Header from '@/components/Header/Header'
import Footer from './components/Footer/Footer'
import { usePathname } from 'next/navigation'
import MainHeader from './components/MainHeader/MainHeader'
import ThirdHeader from './components/ThirdHeader/ThirdHeader'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className='flex flex-col'>
      {pathname === '/' ? <MainHeader /> : pathname === '/contact' ? <ThirdHeader /> : <Header />}

      <div className='flex '>
        <div className='w-full'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
