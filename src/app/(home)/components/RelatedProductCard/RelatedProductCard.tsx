import { Button } from '@/components/ui/Button/Button'
import { TProduct } from '@/types/types'
import { getFromStorage, setToStorage } from '@/utils/storage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RelatedProductCard = ({ product }: { product: TProduct }) => {
  const handleAddToCart = () => {
    const cartItems = getFromStorage('cart', true) || []

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.avatar,
    }

    const existingProductIndex = cartItems.findIndex((item: any) => item.id === product.id)

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity += 1
    } else {
      cartItems.push(productToAdd)
    }

    setToStorage('cart', cartItems, true)
  }
  return (
    <div className='flex gap-[20px] max-w-[324px] w-full'>
      <Link href={`/booking/shop/${product?.id}`} className='flex items-center justify-center'>
        <Image alt='product avatar' src={product?.avatar} width={100} height={100} className='object-cover' />
      </Link>
      <div className='flex flex-col gap-[25px]'>
        <div className='flex flex-col gap-[5px]'>
          <div className='flex flex-col gap-[5px] text-[15px]'>
            <Link href={`/booking/shop/${product?.id}`} className=' hover:text-primary-hover-red cursor-pointer'>
              {product?.name}
            </Link>
            <div>${product?.price}</div>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          variant={'red'}
          className='py-2 px-3.5 rounded-none max-w-max text-xs h-max hover:bg-red-100'
        >
          Add to cart
        </Button>
      </div>
    </div>
  )
}

export default RelatedProductCard
