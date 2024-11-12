import { useGetProfileQuery } from '@/api/Auth'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode, useEffect } from 'react'

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { data: profile, refetch } = useGetProfileQuery({})

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className='flex flex-col gap-[60px]'>
      {/* <Header /> */}
      <div className='flex h-full flex-row px-[70px] md:px-4 sm:flex-col-reverse sm:px-4'>
        <Sidebar>{children}</Sidebar>
        <div className='w-full pl-[54px] sm:pl-0 sm:hidden'>{children}</div>
      </div>
    </div>
  )
}

export default ProfileLayout
