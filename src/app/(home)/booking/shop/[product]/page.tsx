'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductPage = () => {
  const params = useParams()
  const product = params.product
  return (
    <div className='w-full flex items-center justify-center min-h-full'>
      <div className='flex flex-col max-w-[825px] w-full'>
        <div className='flex gap-[3.75rem]'>
          <div>
            <Image src={`/images/slide-one.webp`} alt={'product image'} width={413} height={413} className='object-cover' />
          </div>
          <div className='flex flex-col gap-[30px]'>
            <h1 className='suave-text text-[1.938rem] text-secondary-dark-gray'>Product name</h1>
            <div className='flex flex-col gap-[15px] max-w-max w-full'>
              <div className='text-secondary-dark-gray font-bold text-[1.25rem]'>$35.00</div>
              <div className='border border-primary-hover-red w-auto'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
