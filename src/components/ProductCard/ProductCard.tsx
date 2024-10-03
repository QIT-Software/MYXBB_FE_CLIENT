import React from 'react'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { Button } from '../ui/Button/Button'
import { MyxIcon } from '../icons'
import { format, parseISO } from 'date-fns'

type TProductCard = {
  product: any
}
const ProductCard = ({ product }: TProductCard) => {
  return (
    <div className='border border-secondary-black-blue text-primary-black'>
      <div className='p-5 flex justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <div className='uppercase'>Name</div>
          <div className='font-semibold'>{product.name}</div>
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
      <div className='flex px-5 py-[11px] border-t border-secondary-light-grey justify-end'>
        <div className='flex gap-4 font-semibold items-center'>
          Share this product:
          <div className='flex items-center gap-2'>
            <div className='p-[7px] min-h-[32px] items-center flex border border-secondary-black-blue/30 cursor-pointer'>
              <MyxIcon name='share' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
