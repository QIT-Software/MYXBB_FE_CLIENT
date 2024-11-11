'use client'
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog'
import OrderCard from '@/components/OrdersCard/OrdersCard'
import PageHeader from '@/components/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { getUser } from '@/redux/slices/user/selectors'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const OrdersPage = () => {
  const profile = useSelector(getUser)

  const router = useRouter()
  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='My Orders' />
      <div className='flex flex-col gap-5'>
        {profile?.orders.length ? (
          profile?.orders.map((order: any) => <OrderCard order={order} key={order.id} />)
        ) : (
          <div className='h-full flex mt-[50px] flex-col items-center justify-center gap-10 text-primary-black'>
            <div className='flex flex-col gap-3 items-center'>
              <p className='text-lg font-semibold'>No orders yet? Let’s change that!</p>
              <p className='text-base '>Start shopping now</p>
            </div>
            <Button className='px-4 py-2 font-semibold rounded' onClick={() => router.push('/booking/shop-custom')}>
              Go to shop
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
