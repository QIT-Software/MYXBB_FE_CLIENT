import React from 'react'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { Button } from '../ui/Button/Button'
import { format, parseISO } from 'date-fns'
import { useDispatch } from 'react-redux'
import { triggerCartUpdate } from '@/redux/slices/user/userSlice'

type TProductCard = {
  product: any
}
const ProductCard = ({ product }: TProductCard) => {
  const dispatch = useDispatch()
  const handleReorder = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]')

    const newCartItem = {
      product_type: 'custom_blend',
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }

    const updatedCartItems = [...existingCartItems]
    const existingItemIndex = updatedCartItems.findIndex(item => item.product_id === newCartItem.product_id)

    if (existingItemIndex > -1) {
      updatedCartItems[existingItemIndex].quantity += newCartItem.quantity
    } else {
      updatedCartItems.push(newCartItem)
    }

    localStorage.setItem('cart', JSON.stringify(updatedCartItems))
    dispatch(triggerCartUpdate())
  }
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
            submit={handleReorder}
            submitText='Got it'
            title='Your order has been placed successfully'
            description='Your order added to cart'
          >
            <Button>Reorder</Button>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
