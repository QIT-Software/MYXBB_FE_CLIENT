'use client'
import React from 'react'
import '../styles/globals.css'
import 'react-day-picker/style.css'
import { Open_Sans, Libre_Franklin } from 'next/font/google'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import { Providers } from '@/redux/provider'
import { CustomToastProvider } from '@/components/CustomToast/CustomToast'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

const NotFoundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang='en'>
        <body className={libre_franklin.className}>{children}</body>
      </html>
    </Providers>
  )
}

export default NotFoundLayout
