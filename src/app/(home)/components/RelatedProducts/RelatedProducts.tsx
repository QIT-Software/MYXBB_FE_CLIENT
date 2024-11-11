import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '@/api/Services'
import RelatedProductCard from '../RelatedProductCard/RelatedProductCard'
import { TProduct } from '@/types/types'

const RelatedProducts = ({ category, currentProduct }: { category?: string; currentProduct?: string }) => {
  console.log(currentProduct, 'currentProduct')
  const { data: products } = useGetProductsQuery({
    is_for_shop: 'true',
    category: category || '',
  })

  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (products?.results) {
      const filtered = products.results.filter((product: TProduct) => product.id !== currentProduct)
      setFilteredProducts(filtered)
    }
  }, [products, currentProduct])

  return (
    <div className='flex flex-col gap-[30px] border-t border-gray-300 pt-[50px]'>
      <div className='text-2xl font-bold'>Related products</div>
      <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[50px]'>
        {filteredProducts.length &&
          filteredProducts.slice(0, 6).map((product: TProduct) => <RelatedProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default RelatedProducts
