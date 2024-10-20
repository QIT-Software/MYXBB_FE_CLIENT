'use client'
import { useGetProductsQuery } from '@/api/Services'
import { getCategoryDisplayName } from '@/api/utils/GetCategory'
import ProductCard from '@/app/(home)/components/ProductCard/ProductCard'
import { TProduct } from '@/types/types'
import { useParams } from 'next/navigation'
import Select, { StylesConfig } from 'react-select'
import React, { useState } from 'react'
import { MyxIcon } from '@/components/icons'
import ProductListCard from '@/app/(home)/components/ProductListCard/ProductListCard'
import ClipLoader from 'react-spinners/ClipLoader'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    width: '176px',
    minHeight: '40px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0',
    margin: '0',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontWeight: 400,
    color: '#808288',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 20px)',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontWeight: 400,
    color: '#808288',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 20px)',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
  menu: (provided, state) => ({
    ...provided,
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontWeight: 400,
    color: '#808288',
    padding: '10px',
    backgroundColor: state.isSelected ? 'red' : 'white',
    ':hover': {
      backgroundColor: 'lightgray',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

const CategoryPage = () => {
  const params = useParams()
  const category = params.category
  const [sorting, setSorting] = useState('')
  const [isGrid, setIsGrid] = useState(true)

  const { data: products, isLoading } = useGetProductsQuery({
    ordering: sorting,
    is_for_shop: 'true',
    category: category || '',
  })

  const sortingSelects = [
    { value: 'popularity', label: 'Sort by popularity' },
    { value: 'average_rating', label: 'Sort by average rating' },
    { value: 'created_at', label: 'Sort by latest' },
    { value: 'price', label: 'Sort by price: low to high' },
    { value: '-price', label: 'Sort by price: high to low' },
  ]

  const handleSortChange = (option: { value: string } | null) => {
    if (option) {
      setSorting(option.value)
    } else {
      setSorting('')
    }
  }

  const categoryDisplayName = getCategoryDisplayName(category)

  if (isLoading)
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <ClipLoader color={'red'} size={50} />
      </div>
    )

  if (!products?.results.length) return <div>No products found for {category}</div>

  return (
    <div className='w-full flex items-center justify-center min-h-full'>
      <div className='flex flex-col items-center justify-center gap-5 max-w-[1200px] w-full'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <Select
              className='w-[260px]'
              styles={customStyles}
              value={sortingSelects.find(sort => sort.value === sorting) || null}
              options={sortingSelects}
              placeholder='Default sorting'
              // @ts-ignore
              onChange={handleSortChange}
            />
          </div>
          <div className='flex gap-5 items-center'>
            <div className='text-gray-850'>
              {products?.results.length <= 16
                ? `Showing 1–${products?.results.length} of ${products?.results.length} results`
                : `Showing 1–16 of ${products?.results.length} results`}
            </div>
            <div className='flex text-gray-850'>
              <div
                className='border flex items-center justify-center w-[41px] h-[41px] cursor-pointer'
                onClick={() => setIsGrid(true)}
              >
                <MyxIcon name='grid' className='w-4 h-4' />
              </div>
              <div
                className='border flex items-center justify-center w-[41px] h-[41px] cursor-pointer'
                onClick={() => setIsGrid(false)}
              >
                <MyxIcon name='list' className='w-5 h-5' />
              </div>
            </div>
          </div>
        </div>
        {isGrid ? (
          <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9'>
            {products?.results?.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='flex w-full flex-col gap-[3.125rem]'>
            {products?.results?.map((product: TProduct) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage