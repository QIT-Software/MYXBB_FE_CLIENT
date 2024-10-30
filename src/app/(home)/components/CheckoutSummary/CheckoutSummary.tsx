import { Button } from '@/components/ui/Button/Button'
import { taxes } from '@/constants/taxes'
import { TCartItem } from '@/types/types'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const CheckoutSummary = ({ isValid, loading }: any) => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  const updateSummary = (items: TCartItem[]) => {
    const price = (item: any) => (item.price ? item.price : item.gift_card_item_price)
    const newSubtotal = items.reduce((acc, item) => acc + price(item) * item.quantity, 0)
    const newTax = parseFloat((newSubtotal * 0.0852).toFixed(2))
    const newTotal = parseFloat((newSubtotal + newTax + taxes.CHECKOUT_SHIPPING).toFixed(2))

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
                  <span className='text-gray-900'>${item.price || item?.gift_card_item_price?.toFixed(2)}</span>
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
      </div>

      <Button
        disabled={!isValid}
        variant={'redSubmit'}
        className='!py-4.5 !px-6 w-full bg-primary-hover-red text-white text-lg !h-max'
      >
        {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Place order'}
      </Button>
    </div>
  )
}

export default CheckoutSummary
