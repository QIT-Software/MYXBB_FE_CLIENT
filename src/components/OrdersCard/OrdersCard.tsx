import { MyxIcon } from '@/components/icons'
import StatusBadge from '@/components/StatusBadge/StatusBadge'
import { format, formatDate, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/Button/Button'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

const OrderCard = ({ order }: any) => {
  const [detailView, setDetailView] = useState(false)
  return (
    <div className='border p-4 border-gray-200 rounded'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-[80px] items-center text-secondary-black'>
          <div className='flex flex-col gap-3'>
            <div className='uppercase'>Orders</div>
            <div className='font-semibold'>#{order.public_id}</div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='uppercase'>Date</div>
            <div className='font-semibold'>{format(parseISO(order.created_at), 'dd.MM.yyyy')}</div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='uppercase'>Total Quantity</div>
            <div className='font-semibold text-right'>{order.items.length}</div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='uppercase'>Subtotal</div>
            <div className='font-semibold text-right'>${order.subtotal.toFixed(2)}</div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='uppercase'>Status</div>
            <div className='font-semibold capitalize'>{order.status}</div>
          </div>
          <div className='flex flex-col gap-3 items-center'>
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

        <div className='cursor-pointer' onClick={() => setDetailView((prev: boolean) => !prev)}>
          <MyxIcon name='chevronDown' width={24} height={24} className={detailView ? 'rotate-180' : ''} />
        </div>
      </div>
      {detailView && (
        <div className='flex flex-col gap-4'>
          <div className='w-full mt-4 border-b border-gray-200'></div>

          {order.items.map((item: any, index: number) => (
            <div key={item.id} className='flex flex-col text-secondary-black'>
              <div className='flex gap-4 justify-between'>
                <div className='flex gap-5'>
                  <Image
                    src={item.avatar || '/images/product-placeholder.png'}
                    className='size-14 rounded object-cover'
                    width={60}
                    height={60}
                    alt='Profile avatar'
                  />
                  <div className='flex flex-col gap-3'>
                    <p className='uppercase'>Name</p>
                    <p className='font-semibold'>{item.product_name}</p>
                  </div>
                </div>
                <div className='flex gap-8'>
                  <div className='flex flex-col gap-3'>
                    <p className='uppercase'>Quantity</p>
                    <p className='font-semibold text-right'>{item.quantity}</p>
                  </div>
                  <div className='flex flex-col max-w-[100px] text-right w-full gap-3'>
                    <p className='uppercase'>Price</p>
                    <p className='font-semibold'>${item.product_price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderCard
