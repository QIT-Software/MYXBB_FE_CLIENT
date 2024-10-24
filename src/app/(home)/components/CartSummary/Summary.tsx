'use client'
const Summary = ({ subtotal, tax, total, onCheckout }: any) => {
  return (
    <div className='p-[30px] bg-secondary-white flex flex-col gap-[30px] w-full'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col justify-center py-[10px] border-b border-primary-gray'>
          <p className='text-[15px] text-gray-900'>Subtotal</p>
          <p className='text-[15px] text-secondary-dark-gray'>${subtotal.toFixed(2)}</p>
        </div>
        <div className='flex justify-between py-[10px] border-b border-primary-gray'>
          <p className='text-sm font-medium'>Tax</p>
          <p className='text-sm'>${tax}</p>
        </div>
        <div className='flex justify-between font-bold text-lg py-[10px]'>
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
      <button className='w-full py-2 bg-primary-hover-red text-white rounded-lg' onClick={onCheckout}>
        Proceed to checkout
      </button>
    </div>
  )
}

export default Summary