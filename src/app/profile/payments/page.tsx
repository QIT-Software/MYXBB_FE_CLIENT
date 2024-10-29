'use client'
import { useGetPaymentCardsQuery, useSubmitPaymentMutation } from '@/api/Auth'
import { useGetStatesQuery } from '@/api/Locations'
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
  const [creditData, setCreditData] = useState<boolean>(false)

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
                    <div key={card.id}>
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
