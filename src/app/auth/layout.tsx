'use client'
import { Providers } from '@/redux/provider'
import { Libre_Franklin } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { getFromStorage } from '@/utils/storage'
import { storageKeys } from '@/constants/storage'
import { useEffect } from 'react'

import '../../styles/globals.css'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

export default function AuthLayout({
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
        <body className={libre_franklin.className}>{children}</body>
      </html>
    </Providers>
  )
}
