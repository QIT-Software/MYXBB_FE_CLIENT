import React from 'react'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { Button } from '../ui/Button/Button'
import { format, parseISO } from 'date-fns'

type TProductCard = {
  product: any
}
const ProductCard = ({ product }: TProductCard) => {
  return (
    <div className='border border-secondary-black-blue text-primary-black'>
      <div className='p-5 flex justify-between items-center'>
        <div className='flex flex-col gap-4 max-w-[200px] w-full'>
          <div className='uppercase'>Name</div>
          <div className='font-semibold'>{product.name}</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='uppercase'>Category</div>
          <div className='font-semibold'>{product.category}</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='uppercase'>Price</div>
          <div className='font-semibold'>${product.price}</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='uppercase'>Date</div>
          <div className='font-semibold'>{format(parseISO(product.created_at), 'dd.MM.yyyy')}</div>
        </div>

        <div className='flex flex-col gap-4'>
          <ConfirmDialog
            submit={() => {}}
            submitText='Got it'
            title='Your order has been placed successfully'
            description='Thank you for ordering. Our Myxologist will contact you to check all details and confirm your oder as soon as possible.'
          >
            <Button>Reorder</Button>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
