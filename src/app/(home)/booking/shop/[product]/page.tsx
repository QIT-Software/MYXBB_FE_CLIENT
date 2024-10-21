'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductPage = () => {
  const params = useParams()
  const product = params.product
  return (
    <div className='w-full flex items-center justify-center min-h-full'>
      <div className='flex flex-col items-center justify-center gap-5 max-w-[1200px] w-full'>1</div>
    </div>
  )
}

export default ProductPage
