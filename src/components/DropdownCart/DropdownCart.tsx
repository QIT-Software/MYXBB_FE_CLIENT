import Image from 'next/image'
import React from 'react'
import { MyxIcon } from '../icons'
import { Button } from '../ui/Button/Button'
import { useRouter } from 'next/navigation'

type TDropdownCartProps = {
  cartItems: any[]
  totalAmount: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  removeItem: (id: string) => void
}
const DropdownCart = ({ cartItems, totalAmount, onMouseEnter, onMouseLeave, removeItem }: TDropdownCartProps) => {
  const router = useRouter()
  return (
    <div
      className='absolute right-0 top-full mt-0 w-[300px] bg-gray-950 text-white p-5 '
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={item.product_id} className='flex gap-[15px] items-center pb-[15px]'>
              <div className='flex items-center relative'>
                <Image
                  src={item.image || '/images/auth-bg.webp'}
                  alt={item.name}
                  className='object-cover'
                  width={60}
                  height={60}
                />
                <MyxIcon
                  name='close'
                  className='cursor-pointer absolute left-0 top-0 size-3.5 bg-primary-black text-white rounded-full'
                  onClick={() => removeItem(item.product_id)} // Викликаємо функцію видалення
                />
              </div>
              <div className='flex flex-col gap-[5px] text-[15px] text-gray-1000'>
                <span>{item.name}</span>
                <span className='text-gray-1000 opacity-50'>
                  {item.quantity} × ${item.price || item.gift_card_item_price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <div className='flex flex-col gap-[15px]'>
            <div className='flex gap-[2px] text-[15px] text-gray-1000'>
              <span>Subtotal: </span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={() => router.push('/booking/cart')}
                variant={'redSubmit'}
                className='text-xs  !py-2 !px-[14px] h-max'
              >
                View Cart
              </Button>
              <Button
                onClick={() => router.push('/booking/checkout')}
                variant={'redSubmit'}
                className='text-xs  !py-2 !px-[14px] h-max'
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className='text-center text-gray-400'>Your cart is empty</div>
      )}
    </div>
  )
}

export default DropdownCart
