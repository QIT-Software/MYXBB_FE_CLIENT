import { sidebarLinks } from '@/constants/sidebar'
import Image from 'next/image'
import React from 'react'
import { MyxIcon } from '../icons'
import ConfirmAlert from '../ConfirmAlert/ConfirmAlert'
import { storageKeys } from '@/constants/storage'
import { removeFromStorage } from '@/utils/storage'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { clearUserProfile } from '@/redux/slices/user/userSlice'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    removeFromStorage(storageKeys.AUTH)
    removeFromStorage(storageKeys.REFRESH)
    removeFromStorage('cart')
    dispatch(clearUserProfile())
    router.push('/')
  }
  return (
    <aside className='flex max-w-[238px] w-full flex-col min-h-screen justify-between border-r border-secondary-light-grey sm:flex-col sm:min-h-0 sm:h-max sm:w-full sm:max-w-full sm:border-none'>
      <div className='flex flex-col gap-4 pr-6 md:pr-4'>
        {sidebarLinks.map(item => {
          const isActive = pathname === item.link

          return (
            <>
              <Link
                href={item.link}
                key={item.name}
                className='flex w-full items-center gap-3 sm:border-b sm:border-secondary-black-hover sm:pb-2'
              >
                <Image width={44} height={44} src={item.image} alt='logo' />
                <div className={`text-lg ${isActive ? 'font-bold text-primary-black' : 'text-primary-black'}`}>{item.name}</div>
              </Link>
              <div className='hidden sm:flex sm:flex-col'>{isActive && children}</div>
            </>
          )
        })}
      </div>
      <div className='flex gap-3 text-secondary-site-grey items-center'>
        <ConfirmAlert submitText='Yes, log out' title='Are you sure you want to log out?' submit={handleLogout}>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='p-[13px]'>
              <MyxIcon name='logout' />
            </div>
            <div className='text-lg'>Log out</div>
          </div>
        </ConfirmAlert>
      </div>
    </aside>
  )
}

export default Sidebar
