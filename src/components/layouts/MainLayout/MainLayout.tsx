import { useGetProfileQuery } from '@/api/Auth'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: profile } = useGetProfileQuery({})

  return (
    <div className='flex flex-col gap-[60px]'>
      {/* <Header /> */}
      <div className='flex h-full px-[70px]'>
        <div className='w-full pl-[54px]'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
