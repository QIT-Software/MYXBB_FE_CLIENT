import { useAddGiftCardMutation } from '@/api/Appointments'
import { useLazyGetProfileQuery } from '@/api/Auth'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { TGiftCard, TLoginForm } from '@/types/types'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ClipLoader from 'react-spinners/ClipLoader'

const GiftCardAdding = ({ addGiftCard, card, setCard }: any) => {
  const { register, handleSubmit } = useForm<TGiftCard>({
    mode: 'onChange',
  })

  const handleChange = (e: any) => {
    setCard(e.target.value)
  }

  const onSubmit = async (data: TGiftCard) => {
    await addGiftCard({ data: { gift_card_code: card } }).unwrap()
  }

  return (
    <div className='w-full bg-secondary-white flex flex-col gap-5 px-[30px] pt-[25px] pb-[20px]'>
      <div className='text-[15px] text-primary-gray'>If you have a coupon code, please apply it below.</div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <Input
          placeholder='Username or email *'
          type='gift_card_code'
          onChange={handleChange}
          //     {
          // required: 'Email is required',
          // pattern: {
          //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          //   message: 'Please enter a valid email address',
          // },
          // validate: value => {
          //   const noCyrillic = /^[^\u0400-\u04FF]+$/.test(value)
          //   return noCyrillic || 'Email must not contain Cyrillic characters'
          // },
          //   })}
          className={`mt-1 block w-full px-3 py-2 border text-[15px] text-gray-850 border-secondary-dark-gray/1
                 rounded-md shadow-sm focus:outline-none sm:text-sm`}
        />

        <Button type='submit' className='max-w-[94px] w-full bg-primary-hover-red hover:bg-red-100'>
          {/* {loginLoading ? <ClipLoader size={24} color={'#fff'} /> : */}
          Sign in
          {/* } */}
        </Button>
      </form>
    </div>
  )
}

export default GiftCardAdding
