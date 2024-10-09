import { useGetProfileQuery } from '@/api/Auth'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode } from 'react'
import Header from '@/components/Header/Header'
import Footer from './components/Footer/Footer'
import { usePathname } from 'next/navigation'
import MainHeader from './components/MainHeader/MainHeader'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: profile } = useGetProfileQuery({})
  const pathname = usePathname()

  return (
    <div className='flex flex-col'>
      {pathname === '/' ? <MainHeader /> : <Header />}

      <div className='flex'>
        <div className='w-full'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
