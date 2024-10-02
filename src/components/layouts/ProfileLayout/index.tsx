import { useGetProfileQuery } from '@/api/Auth'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode } from 'react'

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { data: profile } = useGetProfileQuery({})

  return (
    <div className='flex flex-col gap-[60px]'>
      <Header />
      <div className='flex h-full px-[70px]'>
        <Sidebar />
        <div className='w-full pl-[54px]'>{children}</div>
      </div>
    </div>
  )
}

export default ProfileLayout
