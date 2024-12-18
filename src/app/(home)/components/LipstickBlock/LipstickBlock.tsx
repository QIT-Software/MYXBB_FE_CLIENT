import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { useGetProductsQuery } from '@/api/Services'
import { TProduct } from '@/types/types'
import ShopButton from '@/components/ShopButton/ShopButton'

const LipstickBlock = () => {
  const category = 'lipstick'
  const { data: products } = useGetProductsQuery({ is_for_shop: 'true', category })

  if (!products?.results.length) return <></>

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-center justify-center z-[2] text-[3.438rem] text-primary-black font-bold text-center suave-text relative md:text-[2.5rem] sm:text-[2.5rem]'>
        Lipstick
        <div className='z-[1] absolute bottom-[17%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[190px] w-full border-b border-primary-gray'></div>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9'>
        {products?.results.length &&
          products?.results.slice(0, 6).map((product: TProduct) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className='flex items-center justify-center'>
        <ShopButton link={`/booking/shop-custom/product-category/${category}`} title='See More' />
      </div>
    </div>
  )
}

export default LipstickBlock
