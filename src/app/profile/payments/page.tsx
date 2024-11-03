'use client'
import { useDeletePaymentMethodMutation, useGetPaymentCardsQuery, useSubmitPaymentMutation } from '@/api/Auth'
import { useGetStatesQuery } from '@/api/Locations'
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { cn } from '@/lib/utils'
import { TOption } from '@/types/types'
import { MaskedInput } from 'antd-mask-input'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { StylesConfig } from 'react-select'
//@ts-ignore
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'

const selectStyles: StylesConfig<{ value: string | number; label: string }> = {
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

const PaymentsPage = () => {
  const { data: cards } = useGetPaymentCardsQuery({})
  const [submitPayment, { data }] = useSubmitPaymentMutation()
  const [deletePaymentMethod, { isLoading }] = useDeletePaymentMethodMutation()
  const [creditData, setCreditData] = useState<boolean>(false)

  const deleteCard = async (id: string) => {
    await deletePaymentMethod(id)
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
                  {cards?.results?.map((card: any) => (
                    <div key={card.id} className='flex gap-4 items-center border-b border-gray-700 pb-4 max-w-max'>
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
                      <div>
                        <ConfirmDialog
                          submit={() => deleteCard(card.id)}
                          submitText='Delete'
                          title='This card will be deleted'
                          description='Press delete for confirmation this card will be deleted'
                        >
                          <MyxIcon name='delete' width={20} height={20} className='hover:text-primary-red' />
                        </ConfirmDialog>
                      </div>
                    </div>
                  ))}
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
                  await submitPayment({ token: token?.token })
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
