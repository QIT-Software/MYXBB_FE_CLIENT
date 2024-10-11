'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '@/redux/provider'
import { useFacebookTokenMutation, useSocialAuthMutation } from '@/api/Auth'

const FacebookOAuthCallback = () => {
  // const [socialAuth] = useSocialAuthMutation()
  const [facebookToken] = useFacebookTokenMutation()
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(1))
    const accessToken = params.get('access_token')

    if (accessToken) {
      facebookToken({ access_token: accessToken })
      router.push('/profile')
    } else {
      console.error('Access Token не знайдено')
    }
  }, [router])

  return <div>Обробка аутентифікації...</div>
}

export default FacebookOAuthCallback
