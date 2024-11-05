import { useGetProductsQuery } from '@/api/Services'
import ShopButton from '@/components/ShopButton/ShopButton'
import Image from 'next/image'
import React from 'react'

const GIftCardBlock = () => {
  const category = 'gift_cards'
  const { data: products } = useGetProductsQuery({ is_for_shop: 'true', category })

  return (
    <div className='flex gap-7.5 justify-around'>
      <div className='flex flex-col items-center gap-[35px] pt-[8%]'>
        <div className='flex flex-col gap-2.5 max-w-[630px] w-full'>
          <div className='suave-text text-[3.063rem] text-primary-black text-center'>
            Make Your Mark <br /> with a MYX gift card
          </div>
          <div className='text-center text-primary-gray'>
            Birthdays, Bachelorette Parties, Girls Nights, Baby Showers, you name it! Our MYX Gift Cards make the perfect gift for
            any occasion.
          </div>
        </div>
        <ShopButton link={`/booking/shop/${products?.results[0].id}`} title='Shop now' />
      </div>
      <div className='hover:bg-primary-black/20 max-h-[300px] max-w-[300px] w-full'>
        <Image src={'/images/gift-card-image.webp'} alt='custom shop' width={300} height={300} className='object-cover' />
      </div>
    </div>
  )
}

export default GIftCardBlock
