import { Providers } from '@/redux/provider'
import { Libre_Franklin } from 'next/font/google'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

export default function FacebookLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={libre_franklin.className}>{children}</body>
      </html>
    </Providers>
  )
}