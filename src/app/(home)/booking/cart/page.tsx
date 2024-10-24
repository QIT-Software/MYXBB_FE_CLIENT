'use client'
import React from 'react'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Image from 'next/image'
import CartTable from '../../components/CartTable/CartTable'
import Summary from '../../components/CartSummary/Summary'

const CartPage = () => {
  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/#' },
  ]

  const cartItems = [
    {
      id: 1,
      name: 'Shug by Justice Taylor (Liquid Matte)',
      description: 'Liquid Matte Lipstick',
      price: 35.0,
      quantity: 10,
      image: '/path/to/image1.png',
    },
    {
      id: 2,
      name: "Summer Lovin' Pink",
      description: 'Matte Lipstick',
      price: 35.0,
      quantity: 10,
      image: '/path/to/image2.png',
    },
    // Додайте більше товарів за необхідності
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = (subtotal * 0.0825).toFixed(2)
  //@ts-ignore
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2)

  const handleRemoveItem = (id: any) => {
    // Логіка видалення товару з кошика
  }

  const handleQuantityChange = (id: any, newQuantity: any) => {
    // Логіка оновлення кількості товарів у кошику
  }

  const handleCheckout = () => {
    // Логіка обробки оформлення замовлення
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
          <Summary subtotal={subtotal} tax={tax} total={total} onCheckout={handleCheckout} />{' '}
        </div>
      </div>
    </div>
  )
}

export default CartPage
