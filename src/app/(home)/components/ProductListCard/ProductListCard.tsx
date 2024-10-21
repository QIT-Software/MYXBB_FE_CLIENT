import { Button } from '@/components/ui/Button/Button'
import { TProduct } from '@/types/types'
import Image from 'next/image'
import React from 'react'

type TProductListCardProps = {
  product: TProduct
}
const ProductListCard = ({ product }: TProductListCardProps) => {
  return (
    <div className='flex w-full h-[300px]'>
      <div className='w-1/2 flex items-center justify-center'>
        <Image src={product?.avatar} alt={'product image'} width={300} height={300} className='object-cover' />
      </div>
      <div className='w-1/2 flex flex-col gap-[15px]'>
        <div className='flex flex-col gap-[5px]'>
          <div className=' hover:text-primary-hover-red cursor-pointer'>{product?.name}</div>
          <div>${product?.price}</div>
        </div>
        <div className='text-[15px] text-primary-gray'>Sheer shimmer lipstick enhanced with moisture</div>
        <Button variant={'red'} className='py-2 px-3.5 rounded-none max-w-max text-xs h-max hover:bg-red-100'>
          Add to cart
        </Button>
      </div>
    </div>
  )
}

export default ProductListCard
