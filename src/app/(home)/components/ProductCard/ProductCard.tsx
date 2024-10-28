import { MyxIcon } from '@/components/icons'
import { TProduct } from '@/types/types'
import { getFromStorage, setToStorage } from '@/utils/storage'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TProductCardProps = {
  product: TProduct
}
const ProductCard = ({ product }: TProductCardProps) => {
  const handleAddToCart = () => {
    const cartItems = getFromStorage('cart', true) || []

    const productToAdd = {
      product_id: product.id,
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
    <div className='flex flex-col items-center gap-[15px]'>
      <Link href={`/booking/shop/${product?.id}`} className='max-w-[18.625rem] w-full relative'>
        <div className='w-[295px] h-[295px] overflow-hidden flex items-center justify-center'>
          <Image src={product?.avatar} alt='custom shop' width={295} height={295} className='object-cover' />
        </div>{' '}
        <div
          onClick={handleAddToCart}
          className='absolute bottom-0 right-0 h-8 w-8 bg-primary-hover-red text-white rounded-full flex items-center m-0 hover:w-[106px] hover:px-2 transition-all duration-300 hover:bg-red-500 overflow-hidden'
        >
          {/* <span className='ml-2 transition-opacity duration-300 text-xs font-bold opacity-0 group-hover:opacity-100'>
              Add to cart
            </span> */}
          <MyxIcon name='shop' className='size-4' />
        </div>
      </Link>
      <div className='flex flex-col items-center text-[0.938rem] text-secondary-dark-gray gap-2.5'>
        <Link href={`/booking/shop/${product?.id}`} className=' hover:text-primary-hover-red cursor-pointer'>
          {product?.name}
        </Link>
        <div>${product?.price}</div>
      </div>
    </div>
  )
}

export default ProductCard
