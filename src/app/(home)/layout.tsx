'use client'
import { Libre_Franklin, Open_Sans, Inter } from 'next/font/google'
import '../../styles/globals.css'
import { Providers } from '@/redux/provider'
import { useEffect } from 'react'
import { getFromStorage } from '@/utils/storage'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { storageKeys } from '@/constants/storage'
import ProfileLayout from '@/components/layouts/ProfileLayout'
import { useGetProfileQuery } from '@/api/Auth'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const token = getFromStorage(storageKeys.AUTH)

  useEffect(() => {
    if (!token) {
      router.push('/auth')
    }
  }, [pathname])
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <Toaster position='top-right' />
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </Providers>
  )
}
