'use client'
import { MyxIcon } from '@/components/icons'
import ShopButton from '@/components/ShopButton/ShopButton'
import Image from 'next/image'
import React from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useGetProductsQuery } from '@/api/Services'
import LipstickBlock from '../../components/LipstickBlock/LipstickBlock'
import LipGlossBlock from '../../components/LipGlossBlock/LipGlossBlock'
import LipsScrubBlock from '../../components/LipsScrubBlock/LipsScrubBlock'
import BundlesBlock from '../../components/BundlesBlock/BundlesBlock'
import BagsBlock from '../../components/BagsBlock/BagsBlock'
import GIftCardBlock from '../../components/GIftCardBlock/GIftCardBlock'
import ClipLoader from 'react-spinners/ClipLoader'

const CustomShopPage = () => {
  const { data: products, isLoading } = useGetProductsQuery({ is_for_shop: true })
  console.log(products, 'products')
  return (
    <div className='flex flex-col py-[4.375rem] w-full'>
      <div className='flex items-center justify-center px-[3.125rem]'>
        <div className='max-w-[1300px] w-full items-center flex flex-col'>
          <div className='z-[2] text-[4.375rem] text-primary-black font-bold text-center suave-text pb-[7.25rem] relative'>
            Shop MYX
            <div className='z-[1] absolute top-[37%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[190px] w-full border-b border-primary-gray'></div>
          </div>

          {/* primary item */}
          {isLoading ? (
            <div>
              <ClipLoader color={'red'} loading={true} size={50} />
            </div>
          ) : (
            <div className='flex justify-center items-center max-w-[1200px] w-full gap-7'>
              <div className='flex w-1/2'>
                <Image src={products.featured_product.avatar} alt='custom shop' width={585} height={585} />
              </div>
              <div className='w-1/2 flex flex-col gap-[2.188rem] text-center'>
                <div className='flex flex-col gap-2.5'>
                  <h1 className='suave-text text-[3.125rem] text-center text-primary-black font-bold'>
                    {products.featured_product.name}
                  </h1>
                  <p className='text-[1.25rem] font-bold text-primary-black'>Our Miracle Lip Perfecter.</p>
                  <p className='text-2xl font-bold text-primary-gray'>{products.featured_product.description}</p>
                </div>
                <div className='flex items-center justify-center'>
                  <ShopButton link={`/booking/shop/${products.featured_product.id}`} />
                </div>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-[7.5rem] max-w-[1200px] w-full pt-[7.5rem]'>
            <LipstickBlock />
            <LipGlossBlock />
            <BundlesBlock />
            <LipsScrubBlock />
            <BagsBlock />
            <GIftCardBlock />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomShopPage
