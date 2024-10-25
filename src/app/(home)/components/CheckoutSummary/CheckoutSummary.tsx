import { Button } from '@/components/ui/Button/Button'
import { TCartItem } from '@/types/types'
import { useEffect, useState } from 'react'

const CheckoutSummary = () => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('check')

  // Функція для підрахунку підсумків
  const updateSummary = (items: TCartItem[]) => {
    const newSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const newTax = parseFloat((newSubtotal * 0.0852).toFixed(2)) // Податок 8.52%
    const newTotal = parseFloat((newSubtotal + newTax).toFixed(2))

    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(storedCartItems)
    updateSummary(storedCartItems)
  }, [])

  return (
    <div className='p-[30px] w-full bg-secondary-white flex flex-col gap-[30px]'>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex flex-col gap-[10px]'>
          <h2 className='text-xl font-bold'>Your order</h2>
          <div className='flex flex-col justify-center'>
            {cartItems.map(item => (
              <div key={item.id} className='flex items-center gap-4 py-2 border-b border-gray-300'>
                <div className='flex flex-col text-[15px]'>
                  <span className='text-primary-gray'>
                    {item.name} × {item.quantity}
                  </span>
                  <span className='text-gray-900'>${item.price}</span>
                </div>
              </div>
            ))}
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
        </div>
        {/* Payment Method */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='paymentMethod'
                value='check'
                checked={paymentMethod === 'check'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>Check payments</span>
            </label>
            {paymentMethod === 'check' && (
              <p className='text-sm text-gray-500'>
                Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
              </p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='paymentMethod'
                value='creditCard'
                checked={paymentMethod === 'creditCard'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>Credit Card</span>
              <div className='flex gap-2'>
                <img src='/path/to/visa-logo.png' alt='Visa' className='w-10 h-6' />
                <img src='/path/to/mastercard-logo.png' alt='Mastercard' className='w-10 h-6' />
                <img src='/path/to/amex-logo.png' alt='Amex' className='w-10 h-6' />
              </div>
            </label>
            {paymentMethod === 'creditCard' && <p className='text-sm text-gray-500'>Pay securely using your credit card.</p>}
          </div>
        </div>
      </div>

      <Button
        variant={'redSubmit'}
        className='!py-4.5 !px-6 w-full bg-primary-hover-red text-white text-lg !h-max'
        onClick={() => {}}
      >
        Place order
      </Button>
    </div>
  )
}

export default CheckoutSummary
