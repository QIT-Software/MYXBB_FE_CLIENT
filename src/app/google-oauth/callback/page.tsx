'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '@/redux/provider'
import { useSocialAuthMutation } from '@/api/Auth'
import ClipLoader from 'react-spinners/ClipLoader'
import { showToast } from '@/components/CustomToast/CustomToast'

const GoogleOAuthCallback = () => {
  const [socialAuth] = useSocialAuthMutation()
  const router = useRouter()

  useEffect(() => {
    const fetchSocialAuth = async () => {
      const hash = window.location.hash
      const params = new URLSearchParams(hash.slice(1))
      const accessToken = params.get('access_token')

      if (accessToken) {
        try {
          await socialAuth({ access_token: accessToken })
          router.push('/profile')
        } catch (error) {
          console.error('Помилка під час виконання соціальної авторизації:', error)
          router.push('/auth')
        }
      } else {
        router.push('/auth')
        showToast({ message: 'You cannot sign in with this social account', variant: 'error' })
      }
    }

    fetchSocialAuth()
  }, [router])

  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <ClipLoader size={150} color={'#DD3333'} loading={true} />
    </div>
  )
}

export default GoogleOAuthCallback
