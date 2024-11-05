import Link from 'next/link'
import React from 'react'

const SuccessSummary = () => {
  return (
    <div className='p-[30px] w-full bg-secondary-white flex flex-col gap-[30px]'>
      <h2 className='text-2xl font-bold text-center'>Thank you. Your order has been placed!</h2>

      <div className='flex items-center justify-center'>
        <Link
          href={'/booking/shop-custom'}
          className='max-w-[250px] w-full bg-primary-hover-red text-white flex items-center h-[56px] justify-center hover:bg-red-100 !rounded-none text-lg font-bold !py-[18px] px-6'
        >
          Return to shop
        </Link>
      </div>
    </div>
  )
}

export default SuccessSummary
