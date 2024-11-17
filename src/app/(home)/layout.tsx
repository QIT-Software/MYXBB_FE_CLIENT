import { Libre_Franklin, Open_Sans, Inter } from 'next/font/google'
import '../../styles/globals.css'
import { Providers } from '@/redux/provider'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-day-picker/style.css'
import { CustomToastProvider } from '@/components/CustomToast/CustomToast'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '200', '500', '900'] })

export const metadata = {
  title: 'MYX Blend Bar',
  description: 'Welcome to the MYX Blend Bar - the perfect blend of style and luxury.',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <CustomToastProvider />
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </Providers>
  )
}
