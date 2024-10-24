'use client'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Image from 'next/image'
import CartTable from '../../components/CartTable/CartTable'
import Summary from '../../components/CartSummary/Summary'
import { useRouter } from 'next/navigation'
import { getFromStorage } from '@/utils/storage'
import { TCartItem, TProduct } from '@/types/types'

const CartPage = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/#' },
  ]

  // Отримання товарів з localStorage
  useEffect(() => {
    const cartItems = getFromStorage('cart', true) || []
    setCartItems(cartItems)

    // Оновлюємо підсумки
    updateSummary(cartItems)
  }, [])

  // Оновлення підсумків кошика
  const updateSummary = (items: TCartItem[]) => {
    const newSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Рахуємо податок у 8.52%
    const newTax = parseFloat((newSubtotal * 0.0852).toFixed(2))

    // Рахуємо загальну суму
    const newTotal = parseFloat((newSubtotal + newTax).toFixed(2))

    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }

  // Логіка видалення товару з кошика
  const handleRemoveItem = (id: any) => {
    const updatedCartItems = cartItems.filter((item: any) => item.id !== id)
    setCartItems(updatedCartItems)
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))

    // Оновлення підсумків
    updateSummary(updatedCartItems)
  }

  // Логіка оновлення кількості товарів
  const handleQuantityChange = (id: any, newQuantity: any) => {
    const updatedCartItems = cartItems.map((item: any) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    //@ts-ignore
    setCartItems(updatedCartItems)
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))

    updateSummary(updatedCartItems)
  }

  const handleCheckout = () => {
    // Логіка для переходу на сторінку checkout
    router.push('/booking/checkout')
  }
  return (
    <div className='h-auto flex items-center flex-col'>
      <BreadCrumbs paths={paths} title={'Cart'} />

      <div className='flex max-w-[1300px] w-full items-center justify-center pt-[70px] pb-[10px]'>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 items-center justify-center'>
          <div className='font-bold text-gray-975'>Your Cart</div>
          <div className='relative flex items-center justify-center gap-4'>
            <div className=' w-[50px] h-[50px] font-bold bg-primary-hover-red text-white rounded-full flex items-center justify-center'>
              1
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold' style={{ color: 'rgba(57,66,68,0.3)' }}>
            Checkout Details
          </div>
          <div className='flex items-center justify-center gap-4'>
            <div
              className='w-[50px] h-[50px] rounded-full flex font-bold items-center justify-center'
              style={{ backgroundColor: 'rgba(57,66,68,0.09)', color: 'rgba(57,66,68,0.3)' }}
            >
              2
            </div>
          </div>
        </div>
        <div className='w-1/3 text-2xl flex flex-col gap-2.5 text-gray-975 items-center'>
          <div className='font-bold' style={{ color: 'rgba(57,66,68,0.3)' }}>
            Order Complete
          </div>
          <div className='flex items-center justify-center gap-4'>
            <div
              className='w-[50px] h-[50px] font-bold rounded-full flex items-center justify-center'
              style={{ backgroundColor: 'rgba(57,66,68,0.09)', color: 'rgba(57,66,68,0.3)' }}
            >
              3
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col max-w-[1300px] w-full gap-[35px] py-[70px] relative'>
        <div className='flex max-h-[356px] relative'>
          <Image src={'/images/slide-one.webp'} alt={'cart'} width={1300} height={356} className='object-cover' />
          <h1 className='suave-text text-[80px] font-light text-white absolute bottom-10 left-[50%] translate-x-[-50%] '>
            Your Cart
          </h1>
        </div>

        <div className='flex w-full gap-[60px] pt-[96px]'>
          <CartTable cartItems={cartItems} onRemoveItem={handleRemoveItem} onQuantityChange={handleQuantityChange} />
          <Summary subtotal={subtotal} tax={tax} total={total} onCheckout={() => router.push('/booking/checkout')} />
        </div>
      </div>
    </div>
  )
}

export default CartPage
