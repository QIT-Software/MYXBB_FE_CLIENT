'use client'
import React from 'react'
import { Input } from '../ui/Input/Input'
import { MyxIcon } from '../icons'

type SearchInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
}

const SearchInput = ({ value, onChange, className, placeholder }: SearchInputProps) => {
  return (
    <div className='relative w-full max-w-[340px]'>
      <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
        <MyxIcon name='search' width={20} height={20} />
      </span>
      <Input value={value} onChange={onChange} className={`pl-10 ${className}`} placeholder={placeholder} />
    </div>
  )
}

export default SearchInput
