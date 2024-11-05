'use client'

import { MyxIcon } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'

const CartTable = ({ cartItems, onRemoveItem, onQuantityChange }: any) => {
  const price = (item: any) => (item.price ? item.price : item.gift_card_item_price)

  return (
    <table className='w-full table-auto border-collapse h-max'>
      <thead>
        <tr className='text-gray-900 text-[15px]'>
          <th className='border-b text-left pb-[10px] font-normal'>Product</th>
          <th className='border-b text-left pb-[10px] font-normal'>Price</th>
          <th className='border-b text-left pb-[10px] font-normal'>Quantity</th>
          <th className='border-b text-left pb-[10px] font-normal'>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item: any) => (
          <tr key={item.product_id} className='border-b'>
            {/* Product */}
            <td className='py-[25px] px-[5px] flex text-[15px] items-center gap-4'>
              <MyxIcon
                name='close'
                className='size-5 text-secondary-dark-gray opacity-30 cursor-pointer'
                onClick={() => onRemoveItem(item.product_id)}
              />
              <Image src={`${item.image}`} alt={item.name} width={60} height={60} className='w-[60px] h-[60px]object-cover' />
              <div>
                <Link href={'/'} className='text-secondary-dark-gray font-normal hover:text-primary-hover-red'>
                  {item.name}
                </Link>
              </div>
            </td>
            <td className='text-primary-gray text-[15px] px-[5px] py-[25px]'>${item.price || item.gift_card_item_price}</td>
            <td className='py-[25px] px-[5px] text-[15px]'>
              {!item.gift_card_item_price && (
                <div className='flex h-max items-center gap-2'>
                  <button
                    disabled={item.quantity === 1}
                    className='border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-30'
                    onClick={() => item.quantity > 1 && onQuantityChange(item.product_id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className='border px-2 py-1' onClick={() => onQuantityChange(item.product_id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              )}
            </td>

            {/* Subtotal */}
            <td className='p-4 text-[15px]'>${(price(item) * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CartTable
