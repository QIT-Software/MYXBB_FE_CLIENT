import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Navigation from '../Navigation/Navigation'
import { MyxIcon } from '../icons'
import DropdownCart from '../DropdownCart/DropdownCart'
import { getFromStorage, setToStorage } from '@/utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { triggerCartUpdate } from '@/redux/slices/user/userSlice'

const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const dispatch = useDispatch()

  // Отримуємо тригер зі стану
  const cartTrigger = useSelector((state: any) => state.user.cartTrigger)

  const handleMouseEnter = () => {
    setDropdownVisible(true)
  }

  const handleMouseLeave = () => {
    setDropdownVisible(false)
  }

  const price = (item: any) => (item.price ? item.price : item.gift_card_item_price)

  const removeItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item: any) => item.product_id !== id)
    setCartItems(updatedCartItems)
    // @ts-ignore
    setToStorage('cart', updatedCartItems, true)

    const total = updatedCartItems.reduce((sum: any, item: any) => sum + price(item) * item.quantity, 0)
    setTotalAmount(total)
    dispatch(triggerCartUpdate())
  }

  useEffect(() => {
    const storedCartItems = getFromStorage('cart', true) || []
    setCartItems(storedCartItems)

    const total = storedCartItems.reduce((sum: any, item: any) => sum + price(item) * item.quantity, 0)
    setTotalAmount(total)
  }, [cartTrigger])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 && !pathname.includes('/profile'))
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-primary-black'}`}>
      <div className='w-full flex justify-center'>
        <div
          className={`max-w-[1200px] w-full py-2 text-white justify-end text-sm font-medium items-center ${
            isScrolled ? 'hidden' : 'flex'
          }`}
        >
          <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='flex items-center cursor-pointer gap-[5px]'>
              <MyxIcon name='shop' className='size-4' />
              <div className='flex items-center gap-[2px] text-sm'>
                {`$${totalAmount.toFixed(2)}`}
                {cartItems.length > 0 && (
                  <span className='ml-[5px] relative bg-red-500 text-white text-[8px] font-bold rounded h-[14px] w-[18px] flex items-center justify-center'>
                    {cartItems.length}
                    <span className='rotate-180 absolute top-1/2 left-[-4px] transform -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-red-500 border-y-[4px] border-y-transparent' />
                  </span>
                )}
              </div>
            </div>

            {isDropdownVisible && (
              <DropdownCart
                cartItems={cartItems}
                totalAmount={totalAmount}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                removeItem={removeItem}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-center  w-full  ${
          isScrolled
            ? 'gap-[1.75rem] h-[186px] pt-[2.188rem] justify-between'
            : ' justify-center gap-[3.5rem] h-[205px] pt-[4.375rem]'
        } transition-all duration-300`}
      >
        <div>
          <Image src={isScrolled ? '/images/logo-black-text.webp' : '/images/site-logo.png'} alt='logo' width={250} height={40} />
        </div>
        <Navigation isScrolled={isScrolled} />
      </div>
    </div>
  )
}

export default Header
