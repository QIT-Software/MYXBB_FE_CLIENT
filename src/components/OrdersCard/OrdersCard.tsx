import { MyxIcon } from '@/components/icons'
import StatusBadge from '@/components/StatusBadge/StatusBadge'
import { format, formatDate, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/Button/Button'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { setToStorage } from '@/utils/storage'
import { useDispatch } from 'react-redux'
import { triggerCartUpdate } from '@/redux/slices/user/userSlice'
import { useRouter } from 'next/navigation'

const OrderCard = ({ order }: any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [detailView, setDetailView] = useState(false)

  const handleReorder = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    const newCartItems = order.items.map((item: any) => ({
      product_type: item.item_type,
      product_id: item.product_id,
      name: item.product_name,
      price: item.product_price ?? item.gift_card_item_price,
      quantity: item.quantity,
      image: item.avatar || '/images/product-placeholder.png',
    }))

    const updatedCartItems = [...existingCartItems]
    newCartItems.forEach((newItem: any) => {
      const existingItemIndex = updatedCartItems.findIndex(item => item.product_id === newItem.product_id)

      if (existingItemIndex > -1) {
        updatedCartItems[existingItemIndex].quantity += newItem.quantity
      } else {
        updatedCartItems.push(newItem)
      }
    })
    // @ts-ignore
    setToStorage('cart', updatedCartItems, true)
    dispatch(triggerCartUpdate())
  }
  return (
    <div className='border p-4 border-gray-200 rounded'>
      <div className='flex justify-between items-center'>
        <div className='grid grid-cols-6 gap-4 items-center'>
          <div className='flex flex-col gap-2 min-w-[100px]'>
            <div className='uppercase text-sm'>Orders</div>
            <div className='font-semibold'>#{order.public_id}</div>
          </div>
          <div className='flex flex-col gap-2 min-w-[100px]'>
            <div className='uppercase text-sm'>Date</div>
            <div className='font-semibold'>{format(parseISO(order.created_at), 'dd.MM.yyyy')}</div>
          </div>
          <div className='flex flex-col gap-2 min-w-[100px]'>
            <div className='uppercase text-sm'>Total Quantity</div>
            <div className='font-semibold text-right'>{order.items.length}</div>
          </div>
          <div className='flex flex-col gap-2 min-w-[100px]'>
            <div className='uppercase text-sm text-right'>Subtotal</div>
            <div className='font-semibold text-right'>${order.subtotal.toFixed(2)}</div>
          </div>
          <div className='flex flex-col gap-2 min-w-[100px]'>
            <div className='uppercase text-sm'>Status</div>
            <div className='font-semibold capitalize'>{order.status}</div>
          </div>
          <div className='flex flex-col gap-2 min-w-[100px] items-center'>
            <ConfirmDialog
              submit={() => {
                router.push('/booking/cart')
              }}
              submitText='Got it'
              title='Your order has been placed successfully'
              description='Your order added to cart'
            >
              <Button onClick={handleReorder}>Reorder</Button>
            </ConfirmDialog>
          </div>
        </div>
        <div className='cursor-pointer' onClick={() => setDetailView(prev => !prev)}>
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
                  <div className='flex flex-col gap-2'>
                    <p className='uppercase text-sm'>Name</p>
                    <p className='font-semibold'>{item.product_name}</p>
                  </div>
                </div>
                <div className='flex gap-8'>
                  <div className='flex flex-col gap-2'>
                    <p className='uppercase text-sm'>Quantity</p>
                    <p className='font-semibold text-right'>{item.quantity}</p>
                  </div>
                  <div className='flex flex-col max-w-[100px] text-right w-full gap-2'>
                    <p className='uppercase text-sm'>Price</p>
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
