'use client'
import { useGetSelectedMerchQuery } from '@/api/Services'
import BreadCrumbs from '@/app/(home)/components/BreadCrumbs/BreadCrumbs'
import RelatedProductCard from '@/app/(home)/components/RelatedProductCard/RelatedProductCard'
import RelatedProducts from '@/app/(home)/components/RelatedProducts/RelatedProducts'
import ReviewForm from '@/app/(home)/components/ReviewForm/ReviewForm'
import { MyxIcon } from '@/components/icons'
import { Input } from '@/components/ui/Input/Input'
import { TOption } from '@/types/types'
import { getFromStorage, setToStorage } from '@/utils/storage'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig<{ value: string | number; label: string }> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '42px',
    marginTop: '0',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '42px',
    padding: '0',
    margin: '0',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '42px',
  }),
}

const ProductPage = () => {
  const params = useParams()
  const product = params.product
  const { data: selectedProduct } = useGetSelectedMerchQuery({ id: product })
  const isGiftCard = selectedProduct?.category === 'gift_cards'

  const [quantity, setQuantity] = useState(1)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Функція для обробки зміни поля
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setRecipientEmail(email)

    // Валідація електронної пошти
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError(null) // Очищаємо помилку, якщо email валідний
    }
  }

  const handleAddToCart = () => {
    const cartItems = getFromStorage('cart', true) || []

    const productToAdd = {
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      gift_card_item_price: isGiftCard ? selectedValue : null,
      gift_card_recipient_email: isGiftCard ? recipientEmail : null,
      price: isGiftCard ? null : selectedProduct.price,
      quantity: quantity,
      image: selectedProduct.avatar,
    }

    const existingProductIndex = cartItems.findIndex((item: any) => item.product_id === selectedProduct.product_id)

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity += quantity
    } else {
      cartItems.push(productToAdd)
    }

    setToStorage('cart', cartItems, true)
  }

  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/booking/shop-custom' },
    {
      label: selectedProduct?.category,
      href: `/booking/shop-custom/product-category/${selectedProduct?.category}`,
    },
    { label: selectedProduct?.name, href: '#' },
  ]

  const availableOptions = [50, 80, 150, 200]

  const shippingStateOptions = availableOptions.map(value => ({
    value: value.toString(),
    label: `$${value}`,
  }))

  const [selectedValue, setSelectedValue] = useState<number | null>(50)

  const handleSelectChange = (option: TOption | null) => {
    const value = option ? parseInt(option.value as string, 10) : null
    setSelectedValue(value)
  }

  return (
    <div className='h-auto'>
      <BreadCrumbs paths={paths} title={selectedProduct?.name} />
      <div className='w-full flex items-center justify-center min-h-full py-[4.375rem]'>
        <div className='flex flex-col gap-[30px] justify-center max-w-[1200px] w-full'>
          <div className='flex justify-center gap-[3.75rem]'>
            <div className='relative'>
              <Image src={selectedProduct?.avatar} alt={'product image'} width={413} height={413} className='object-cover' />
            </div>

            <div className='flex flex-col gap-[30px] max-w-[50%] w-full'>
              <h1 className='text-[1.938rem] text-secondary-dark-gray font-bold suave-text'>{selectedProduct?.name}</h1>

              <div className='flex flex-col gap-[15px] w-max'>
                {isGiftCard ? (
                  <div className='text-secondary-dark-gray font-bold text-[1.25rem]'>$50.00 - $200.00</div>
                ) : (
                  <div className='text-secondary-dark-gray font-bold text-[1.25rem]'>${selectedProduct?.price}</div>
                )}

                <div className='border-t border-primary-hover-red w-full max-w-[60px]'></div>
              </div>

              {!isGiftCard && <div className='text-primary-gray'>{selectedProduct?.description}</div>}

              <div className={`flex gap-4 ${isGiftCard ? 'flex-col' : 'items-center'}`}>
                {!isGiftCard ? (
                  <div className='flex items-center border border-gray-300 px-2'>
                    <button onClick={decreaseQuantity} className='px-2 text-xl'>
                      -
                    </button>
                    <span className='px-4'>{quantity}</span>
                    <button onClick={increaseQuantity} className='px-2 text-xl'>
                      +
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-col gap-3'>
                    <div>
                      <Input
                        value={recipientEmail}
                        onChange={handleChange}
                        placeholder='Enter email for gift card'
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none`}
                      />
                      {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
                    </div>

                    <Select
                      styles={customStyles}
                      value={shippingStateOptions.find((option: TOption) => option.value === selectedValue?.toString()) || null}
                      options={shippingStateOptions}
                      onChange={option => handleSelectChange(option as TOption)}
                    />
                  </div>
                )}
                <button className='bg-primary-red text-white px-6 py-2 font-bold' onClick={handleAddToCart}>
                  Add to cart
                </button>
              </div>

              <div className='text-primary-gray text-sm capitalize'>Category: {selectedProduct?.category}</div>

              {/* <div className='flex flex-col gap-2.5'>
                <div className='text-secondary-dark-gray font-bold'>Share this product</div>
                <div className='flex gap-1'>
                  <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                    <MyxIcon name='twitter' className='size-4' />
                  </div>
                  <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                    <MyxIcon name='pinterest' className='size-4' />
                  </div>
                  <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                    <MyxIcon name='linkedin' className='size-4' />
                  </div>
                  <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                    <MyxIcon name='whatsapp' className='size-4' />
                  </div>
                  <div className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'>
                    <MyxIcon name='facebookShare' className='size-4' />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className='flex flex-col gap-[60px]'>
            <ReviewForm product={selectedProduct} />
            {!isGiftCard && <RelatedProducts category={selectedProduct?.category} currentProduct={selectedProduct?.product_id} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
