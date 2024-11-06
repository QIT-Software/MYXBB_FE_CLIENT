'use client'
import { Libre_Franklin, Open_Sans, Inter } from 'next/font/google'
import '../../styles/globals.css'
import { Providers } from '@/redux/provider'
import { Toaster } from 'react-hot-toast'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { CustomToastProvider } from '@/components/CustomToast/CustomToast'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '200', '500', '900'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          {/* <Toaster position='top-right' /> */}
          <CustomToastProvider />
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </Providers>
  )
}
