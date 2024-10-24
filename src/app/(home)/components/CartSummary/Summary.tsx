'use client'

import { Button } from '@/components/ui/Button/Button'

const Summary = ({ subtotal, tax, total, onCheckout }: any) => {
  return (
    <div className='p-[30px] bg-secondary-white flex flex-col gap-[30px] w-full'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col justify-center py-[10px] border-b border-primary-gray'>
          <p className='text-[15px] text-gray-900'>Subtotal</p>
          <p className='text-[15px] text-secondary-dark-gray'>${subtotal.toFixed(2)}</p>
        </div>
        <div className='flex flex-col justify-between py-[10px] border-b border-primary-gray'>
          <p className='text-[15px] text-gray-900'>Tax</p>
          <p className='text-primary-gray'>${tax}</p>
        </div>
        <div className='flex flex-col justify-between font-bold text-lg py-[10px]'>
          <p className='text-gray-900'>Total</p>
          <p className='text-xl text-secondary-dark-gray'>${total}</p>
        </div>
      </div>
      <Button
        variant={'redSubmit'}
        className='!py-4.5 !px-6 w-full bg-primary-hover-red text-white text-lg !h-max'
        onClick={onCheckout}
      >
        Proceed to checkout
      </Button>
    </div>
  )
}

export default Summary
