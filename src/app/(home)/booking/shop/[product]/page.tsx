'use client'
import { useGetSelectedMerchQuery } from '@/api/Services'
import RelatedProductCard from '@/app/(home)/components/RelatedProductCard/RelatedProductCard'
import RelatedProducts from '@/app/(home)/components/RelatedProducts/RelatedProducts'
import ReviewForm from '@/app/(home)/components/ReviewForm/ReviewForm'
import { MyxIcon } from '@/components/icons'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const ProductPage = () => {
  const params = useParams()
  const product = params.product
  const { data: selectedProduct } = useGetSelectedMerchQuery({ id: product })

  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className='w-full flex items-center justify-center min-h-full py-[4.375rem]'>
      <div className='flex flex-col gap-[30px] justify-center max-w-[1200px] w-full'>
        <div className='flex justify-center gap-[3.75rem]'>
          <div className='relative'>
            <Image src={selectedProduct?.avatar} alt={'product image'} width={413} height={413} className='object-cover' />
          </div>

          <div className='flex flex-col gap-[30px] max-w-[375px] w-full'>
            <h1 className='text-[1.938rem] text-secondary-dark-gray font-bold suave-text'>{selectedProduct?.name}</h1>

            <div className='flex flex-col gap-[15px] w-max'>
              <div className='text-secondary-dark-gray font-bold text-[1.25rem]'>${selectedProduct?.price}</div>

              <div className='border-t border-primary-hover-red w-full'></div>
            </div>

            <div className='text-primary-gray'>{selectedProduct?.description} </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center border border-gray-300 px-2'>
                <button onClick={decreaseQuantity} className='px-2 text-xl'>
                  -
                </button>
                <span className='px-4'>{quantity}</span>
                <button onClick={increaseQuantity} className='px-2 text-xl'>
                  +
                </button>
              </div>
              <button className='bg-primary-red text-white px-6 py-2 font-bold'>Add to cart</button>
            </div>

            <div className='text-primary-gray text-sm capitalize'>Category: {selectedProduct?.category}</div>

            <div className='flex flex-col gap-2.5'>
              <div className='text-secondary-dark-gray font-bold'>Share this product</div>
              <div className='flex gap-1'>
                <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                  <MyxIcon name='twitter' className='size-4' />
                </div>
                <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                  <MyxIcon name='pinterest' className='size-4' />
                </div>
                <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                  <MyxIcon name='linkedin' className='size-4' />
                </div>
                <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                  <MyxIcon name='whatsapp' className='size-4' />
                </div>
                <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                  <MyxIcon name='facebookShare' className='size-4' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[60px]'>
          <ReviewForm product={selectedProduct} />
          <RelatedProducts category={selectedProduct?.category} currentProduct={selectedProduct?.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
