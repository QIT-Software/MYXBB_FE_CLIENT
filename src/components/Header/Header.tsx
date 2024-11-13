import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Navigation from '../Navigation/Navigation'
import { MyxIcon } from '../icons'
import DropdownCart from '../DropdownCart/DropdownCart'
import { getFromStorage, setToStorage } from '@/utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { triggerCartUpdate } from '@/redux/slices/user/userSlice'
import NavigationSidebar from '../NavigationSidebar/NavigationSidebar'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - scrollPosition) > 30) {
        setScrollPosition(currentScrollY)

        // Only set `isScrolled` based on scroll position if pathname does not include "profile"
        if (currentScrollY > 50 && !pathname.includes('profile')) {
          setIsScrolled(true)
        } else if (!pathname.includes('profile')) {
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition, pathname])

  return (
    <>
      <div className='md:hidden sm:hidden min-h-[250px]'>
        <div
          className={`w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'top-[-36px] bg-white' : 'bg-primary-black'} ${
            pathname.includes('profile') ? 'block' : 'fixed'
          }`}
        >
          <div className='w-full flex justify-center'>
            <div
              className={`max-w-[1200px] flex w-full py-2 text-white  translate-y-0 transition-all
               duration-800 justify-end text-sm font-medium items-center ${isScrolled && 'translate-y-[-100%]'}`}
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
            className={`flex flex-col items-center w-full transition-all duration-800 ${
              isScrolled ? 'smooth-transition justify-between' : 'reverse-smooth-transition justify-center'
            }`}
          >
            <div>
              <Image
                src={isScrolled ? '/images/logo-black-text.webp' : '/images/site-logo.png'}
                alt='logo'
                width={250}
                height={40}
              />
            </div>
            <Navigation isScrolled={isScrolled} />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className='hidden md:block sm:block'>
        <div className={`w-full z-50 transition-all duration-300 bg-primary-black pr-[20px] py-[20px]`}>
          <div className={`flex items-center w-full transition-all duration-800 justify-between`}>
            <Image
              onClick={() => router.push('/')}
              src={'/images/site-logo.png'}
              alt='logo'
              width={250}
              height={40}
              className='object-cover w-[250px] h-[40px] cursor-pointer'
            />
            <div className='flex gap-2.5'>
              <div className='w-full flex justify-center'>
                <div
                  className={`max-w-[1200px] flex w-full py-2 text-white  translate-y-0 transition-all
               duration-800 justify-end text-sm font-medium items-center`}
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
              <div className='w-[60px] h-[50px] cursor-pointer' onClick={() => setOpen(!open)}>
                <MyxIcon
                  name={open ? 'close' : 'menu'}
                  className='w-[60px] h-[50px] text-white  hover:text-gray-700 hover:opacity-95'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <NavigationSidebar open={open} setOpen={setOpen} className='md:w-[500px] sm:w-full' />}
    </>
  )
}

export default Header
