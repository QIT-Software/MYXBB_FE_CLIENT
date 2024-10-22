import React from 'react'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

const CartPage = () => {
  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/#' },
  ]
  return (
    <div className='h-auto'>
      <BreadCrumbs paths={paths} title={'Cart'} />
    </div>
  )
}

export default CartPage
