import { useAddGiftCardMutation } from '@/api/Appointments'
import { useLazyGetProfileQuery } from '@/api/Auth'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { TGiftCard, TLoginForm } from '@/types/types'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

const GiftCardAdding = ({ addGiftCard, card, setCard, setShowGift }: any) => {
  const { register, handleSubmit } = useForm<TGiftCard>({
    mode: 'onChange',
  })

  const handleChange = (e: any) => {
    setCard(e.target.value)
  }

  const onSubmit = async (data: TGiftCard) => {
    try {
      await addGiftCard({ data: { gift_card_code: card } }).unwrap()
      setShowGift(false)
      toast(t => <CustomToaster variant='success' message={'Gift card added successfully'} dismiss={() => toast.dismiss(t.id)} />)
    } catch (err: any) {
      const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
      toast(t => (
        <CustomToaster
          variant='error'
          message={`Failed to adding gift card: ${errorMessage}`}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
    }
  }

  return (
    <div className='w-full bg-secondary-white flex flex-col gap-5 px-[30px] pt-[25px] pb-[20px]'>
      <div className='text-[15px] text-primary-gray'>If you have a coupon code, please apply it below.</div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-5'>
        <Input
          placeholder='Coupon code'
          type='gift_card_code'
          onChange={handleChange}
          className={`mt-1 h-[50px] block w-full px-3 py-2 border text-[15px] text-gray-850 border-secondary-dark-gray/1
                 rounded-md shadow-sm focus:outline-none sm:text-sm`}
        />

        <Button type='submit' className='max-w-max w-full bg-primary-hover-red hover:bg-red-100'>
          Apply coupon
        </Button>
      </form>
    </div>
  )
}

export default GiftCardAdding
