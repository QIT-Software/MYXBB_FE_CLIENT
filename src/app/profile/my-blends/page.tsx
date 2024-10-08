'use client'
import { useGetCustomBlendsQuery } from '@/api/Appointments'
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'
import ProductCard from '@/components/ProductCard/ProductCard'
import SearchInput from '@/components/SearchInput/SearchInput'
import { Button } from '@/components/ui/Button/Button'
import { format } from 'date-fns'
import React, { ChangeEvent, useState } from 'react'

const MyCustomBlendsPage = () => {
  const [search, setSearch] = useState('')
  const { data: blends } = useGetCustomBlendsQuery({})

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const formatDateForSearch = (createdAt: string) => {
    return format(new Date(createdAt), 'yyyy-MM-dd')
  }

  const filteredBlends = blends?.results?.filter((blend: any) => {
    const searchTerm = search.toLowerCase()
    const formattedDate = formatDateForSearch(blend.created_at)

    return blend.name.toLowerCase().includes(searchTerm) || formattedDate.includes(searchTerm)
  })

  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='My Custom Blends' />
      <div className='flex flex-col gap-5'>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          className='m-0 !max-w-[346px]'
          placeholder='Search by Custom Blends name or date'
        />
        {filteredBlends?.length ? (
          filteredBlends.map((blend: any) => <ProductCard key={blend.id} product={blend} />)
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  )
}

export default MyCustomBlendsPage
