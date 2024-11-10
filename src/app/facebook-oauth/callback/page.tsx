'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '@/redux/provider'
import { useFacebookTokenMutation, useSocialAuthMutation } from '@/api/Auth'
import ClipLoader from 'react-spinners/ClipLoader'
import { showToast } from '@/components/CustomToast/CustomToast'

const FacebookOAuthCallback = () => {
  // const [socialAuth] = useSocialAuthMutation()
  const [facebookToken] = useFacebookTokenMutation()
  const router = useRouter()

  useEffect(() => {
    const fetchFacebookToken = async () => {
      const hash = window.location.hash
      const params = new URLSearchParams(hash.slice(1))
      const accessToken = params.get('access_token')

      if (accessToken) {
        try {
          await facebookToken({ access_token: accessToken }).unwrap()

          router.push('/profile')
        } catch (error) {
          console.error('Помилка під час отримання токену:', error)
          router.push('/auth')
          showToast({ message: 'You cannot sign in with this social account', variant: 'error' })
        }
      } else {
        console.error('Access Token не знайдено')
        router.push('/auth')
      }
    }

    fetchFacebookToken()
  }, [router])

  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <ClipLoader size={150} color={'#DD3333'} loading={true} />
    </div>
  )
}

export default FacebookOAuthCallback
