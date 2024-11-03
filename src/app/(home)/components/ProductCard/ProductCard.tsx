import DropdownCart from '@/components/DropdownCart/DropdownCart'
import { MyxIcon } from '@/components/icons'
import { triggerCartUpdate } from '@/redux/slices/user/userSlice'
import { TProduct } from '@/types/types'
import { getFromStorage, setToStorage } from '@/utils/storage'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

type TProductCardProps = {
  product: TProduct
}
const ProductCard = ({ product }: TProductCardProps) => {
  const dispatch = useDispatch()

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    if (product.pictures && product.pictures[0]?.picture) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const cartItems = getFromStorage('cart', true) || []

    const productToAdd = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.avatar,
    }

    const existingProductIndex = cartItems.findIndex((item: any) => item.product_id === product.id)

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity += 1
    } else {
      cartItems.push(productToAdd)
    }

    setToStorage('cart', cartItems, true)
    dispatch(triggerCartUpdate())
    toast(t => <DropdownCart cartItems={cartItems} isShortView={true} t={t} />)
  }

  return (
    <div className='flex flex-col items-center gap-[15px]'>
      <Link href={`/booking/shop/${product?.id}`} className='max-w-[18.625rem] w-full relative'>
        <div
          className='w-[295px] h-[295px] overflow-hidden flex items-center justify-center'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            // @ts-ignore
            src={isHovered ? product?.pictures[0]?.picture : product.avatar}
            alt='custom shop'
            width={295}
            height={295}
            className='object-cover duration-500 ease-in-out'
            style={{ opacity: isHovered ? 0.8 : 1 }}
          />
        </div>
        <div
          onClick={handleAddToCart}
          className='absolute bottom-0 right-0 p-2 h-8 w-8 bg-primary-hover-red text-white rounded-full flex items-center justify-center'
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
