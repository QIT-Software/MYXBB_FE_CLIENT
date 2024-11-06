'use client'
import {
  useDeletePaymentMethodMutation,
  useGetPaymentCardsQuery,
  useMarkDefaultCardMutation,
  useSubmitPaymentMutation,
} from '@/api/Auth'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
//@ts-ignore
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'

const PaymentsPage = () => {
  const { data: cards } = useGetPaymentCardsQuery({})
  const [submitPayment, { data }] = useSubmitPaymentMutation()
  const [deletePaymentMethod, { isLoading }] = useDeletePaymentMethodMutation()
  const [markDefault, { isLoading: markDefaultLoading }] = useMarkDefaultCardMutation()
  const [creditData, setCreditData] = useState<boolean>(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)

  const toggleDropdown = (cardId: any) => {
    setOpenDropdownId(prevId => (prevId === cardId ? null : cardId))
  }

  const deleteCard = async (id: string) => {
    await deletePaymentMethod(id)
  }

  const markDefaultCard = async (id: string) => {
    await markDefault(id)
  }

  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='Payment Methods' />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-lg uppercase'>Credit / Debit Card</h2>
            {!creditData ? (
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-4'>
                  {isLoading ? (
                    <ClipLoader color='black' size={20} />
                  ) : (
                    <>
                      {cards?.results?.map((card: any) => (
                        <div
                          key={card.id}
                          className='flex gap-4 justify-between items-center border-b border-gray-700 pb-4 w-full'
                        >
                          <div className='flex max-w-max items-center gap-5'>
                            <div className='flex flex-col gap-2.5'>
                              <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                  <div className='flex gap-1'>
                                    <p className='text-sm'>{card?.card_brand}</p>
                                    <p className='text-sm'>**** **** **** {card?.last_4}</p>
                                  </div>
                                </div>
                                <div className='flex gap-1'>
                                  <p className='text-sm'>
                                    Expiration {card?.exp_month}/ {card?.exp_year}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {card.is_default && (
                              <div className='px-3 py-1 bg-primary-black text-sm text-white rounded-full'>Default</div>
                            )}
                          </div>

                          <div>
                            <div className='relative inline-block text-left'>
                              <button onClick={() => toggleDropdown(card.id)} className='hover:text-primary-red'>
                                <MyxIcon name='dots' width={20} height={20} />
                              </button>

                              {openDropdownId === card.id && (
                                <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10'>
                                  <button
                                    onClick={() => {
                                      toggleDropdown(null)
                                      markDefaultCard(card.id)
                                    }}
                                    className='block w-full px-4 py-2 text-left text-sm hover:bg-gray-100'
                                  >
                                    Make default
                                  </button>

                                  <button
                                    onClick={() => {
                                      toggleDropdown(null)
                                      deleteCard(card.id)
                                    }}
                                    className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100'
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setCreditData(!creditData)}>
                  + Add Credit Card
                </div>
              </div>
            ) : (
              <PaymentForm
                applicationId={process.env.NEXT_PUBLIC_SANDBOX_APPLICATION_ID}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
                cardTokenizeResponseReceived={async (token: any) => {
                  try {
                    await submitPayment({ token: token?.token }).unwrap()
                    toast(t => (
                      <CustomToaster
                        variant='success'
                        message={'Payment method successfully added'}
                        dismiss={() => toast.dismiss(t.id)}
                      />
                    ))
                  } catch (err: any) {
                    const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
                    toast(t => (
                      <CustomToaster
                        variant='error'
                        message={`Failed to adding payment method: ${errorMessage}`}
                        dismiss={() => toast.dismiss(t.id)}
                      />
                    ))
                  }
                  setCreditData(false)
                }}
              >
                <CreditCard />
              </PaymentForm>
            )}
          </div>
          <div className='border border-secondary-light-grey'></div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
