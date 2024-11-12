//@ts-nocheck
'use client'
import { Controller, useForm } from 'react-hook-form'
// import { Input, Button } from '@/components/ui'
import { use, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import PageHeader from '@/components/PageHeader/PageHeader'
import Select, { StylesConfig } from 'react-select'
import Label from '@/components/ui/Label/Label'
import { TOption } from '@/types/types'
import { useGetStatesQuery } from '@/api/Locations'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/Checkbox/Checkbox'
import { usePatchProfileMutation } from '@/api/Auth'
import { getUser } from '@/redux/slices/user/selectors'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { MyxIcon } from '@/components/icons'

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

const AddressBookPage = () => {
  const profile = useSelector(getUser)

  const { data: states, isSuccess } = useGetStatesQuery({})
  const [patchProfile, { isLoading }] = usePatchProfileMutation()

  const [showShippingForm, setShowShippingForm] = useState(false)
  const [showBillingForm, setShowBillingForm] = useState(false)

  const initialIsShippingEqualsBilling = useRef(profile?.is_shipping_address_equals_billing)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      is_shipping_address_equals_billing: false,
      billing_address: profile?.billing_address || {
        address: '',
        region: '',
        state: '',
        city: '',
        zip_code: '',
        apartment: '',
      },
      shipping_address: profile?.shipping_address || {
        address: '',
        region: '',
        state: '',
        city: '',
        zip_code: '',
        apartment: '',
      },
    },
  })

  const shipping = watch('shipping_address')
  const billing = watch('billing_address')

  useEffect(() => {
    if (profile) {
      setValue('billing_address', profile.billing_address)
      setValue('shipping_address', profile.shipping_address)
      setValue('is_shipping_address_equals_billing', profile.is_shipping_address_equals_billing)
    }
  }, [profile, setValue])

  const onSubmit = async (data: any) => {
    const isManuallyChanged = isShippingEqualsBilling !== initialIsShippingEqualsBilling.current

    let combinedData = {
      ...data,
      billing_address: data.billing_address,
      shipping_address: data.shipping_address,
    }

    if (combinedData.is_shipping_address_equals_billing) {
      delete combinedData.shipping_address
    }

    await patchProfile(combinedData).unwrap()
    reset()
    setShowBillingForm(false)
    setShowShippingForm(false)
  }

  const handleDelete = async (obj: any) => {
    await patchProfile(obj).unwrap()
    // @ts-ignore
    setValue('shipping_address', profile?.shipping_address)
    // @ts-ignore
    setValue('billing_address', profile?.billing_address)
  }

  const getStateOptions = (region: string, states: Record<string, string[]>): TOption[] => {
    if (!states || !region) return []
    return (
      states[region]?.map((state: string) => ({
        value: state,
        label: state,
      })) || []
    )
  }

  const handleEdit = (type: any) => {
    if (type === 'shipping') {
      // @ts-ignore
      setValue('shipping_address', profile?.shipping_address)
      setShowShippingForm(true)
    } else if (type === 'billing') {
      // @ts-ignore
      setValue('billing_address', profile?.billing_address)
      setShowBillingForm(true)
    }
  }

  const regionOptions = [
    {
      value: 'United States',
      label: 'United States',
    },
    {
      value: 'Canada',
      label: 'Canada',
    },
    {
      value: 'Mexico',
      label: 'Mexico',
    },
  ]

  const billingRegion = watch('billing_address.region')
  const billingStateOptions = getStateOptions(billingRegion, states)

  const shippingRegion = watch('shipping_address.region')
  const shippingStateOptions = getStateOptions(shippingRegion, states)
  const isShippingEqualsBilling = watch('is_shipping_address_equals_billing')

  return (
    <div className='flex w-full h-full flex-col gap-8'>
      <PageHeader title='Address book' />
      {!profile ? (
        <div>
          <ClipLoader color='red' size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-lg uppercase'>Billing Address</h2>
            <div>
              {!profile?.billing_address?.full_address && !showBillingForm ? (
                <div className='flex flex-col gap-5'>
                  <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setShowBillingForm(true)}>
                    + Add Billing Address
                  </div>
                </div>
              ) : (
                <>
                  {!showBillingForm && (
                    <div className='flex justify-between items-center'>
                      <div className='text-primary-black'>
                        <div>{`${profile?.first_name} ${profile?.last_name}`}</div>
                        <div>{`${profile?.billing_address?.full_address}`}</div>
                        {profile.phone && <div>{`${profile?.phone}`}</div>}
                      </div>
                      <div className='flex gap-2'>
                        <button type='button' onClick={() => handleEdit('billing')}>
                          <MyxIcon name='edit' width={20} height={20} className='hover:text-primary-red' />
                        </button>
                        <button type='button' onClick={() => handleDelete({ billing_address: {} })}>
                          <MyxIcon name='delete' width={20} height={20} className='hover:text-primary-red' />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {showBillingForm && (
            <div className='grid grid-cols-2 gap-6 mt-4 md:flex md:flex-col sm:flex sm:flex-col'>
              <div>
                <Label required text='Address' />
                <Input
                  placeholder='Street address'
                  {...register('billing_address.address', { required: 'Address is required' })}
                />
                {errors?.billing_address?.address && (
                  <span className='text-red-500'>{errors?.billing_address?.address.message}</span>
                )}
              </div>
              <div>
                <Label required text='Region' />
                <Controller
                  name='billing_address.region'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      styles={customStyles}
                      value={regionOptions.find((option: TOption) => option.value === field.value)}
                      options={regionOptions}
                      placeholder='Region'
                      onChange={option => {
                        field.onChange((option as { value: string; label: string })?.value)
                        setValue('billing_address.state', '')
                      }}
                    />
                  )}
                />{' '}
                {errors?.billing_address?.region && <span className='text-red-500'>{errors.billing_address.region.message}</span>}
              </div>
              <div>
                <Label required text='Apartment' />
                <Input
                  placeholder='Aprt, Suite, Bldg.'
                  {...register('billing_address.apartment', { required: 'Apartment is required' })}
                />
                {errors?.billing_address?.apartment && (
                  <span className='text-red-500'>{errors.billing_address.apartment.message}</span>
                )}
              </div>
              <div>
                <Label required text='State' />
                <Controller
                  name='billing_address.state'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      styles={customStyles}
                      value={billingStateOptions.find((option: TOption) => option.value === field.value) || null}
                      options={billingStateOptions}
                      placeholder='State'
                      onChange={option => field.onChange((option as { value: string | number; label: string })?.value)}
                    />
                  )}
                />{' '}
                {errors?.billing_address?.state && <span className='text-red-500'>{errors.billing_address.state.message}</span>}
              </div>
              <div>
                <Label required text='City' />
                <Input placeholder='City' {...register('billing_address.city', { required: 'City is required' })} />
                {errors?.billing_address?.city && <span className='text-red-500'>{errors.billing_address.city.message}</span>}
              </div>
              <div>
                <Label required text='Zip code' />
                <Input
                  placeholder='Zip code'
                  {...register('billing_address.zip_code', {
                    pattern: {
                      value: /^[0-9]+(-[0-9]+)?$/,
                      message: 'Zip code must be a number or in the format 12345-6789',
                    },
                    minLength: {
                      value: 4,
                      message: 'Zip code must be at least 4 characters long',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Zip code must be no longer than 10 characters',
                    },
                  })}
                />
                {errors?.billing_address?.zip_code && (
                  <span className='text-red-500'>{errors?.billing_address?.zip_code.message}</span>
                )}
              </div>
              <div className='w-full flex gap-2 items-center'>
                <Controller
                  name='is_shipping_address_equals_billing'
                  control={control}
                  render={({ field }) => (
                    <Checkbox id='is_shipping_address_equals_billing' checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <span className={cn('text-secondary-black')}>Shipping Address the same as billing</span>
              </div>
              <div className='col-span-2 flex gap-4'>
                <Button type='submit'>Save</Button>
                <Button type='button' variant='blackUnderline' onClick={() => setShowBillingForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className='border-b border-secondary-light-grey' />

          <div className='flex flex-col gap-3'>
            <h2 className='text-lg uppercase'>Shipping Address</h2>
            {!profile?.shipping_address?.full_address && !showShippingForm ? (
              <div className='flex flex-col gap-5'>
                <div className='cursor-pointer font-semibold text-base capitalize' onClick={() => setShowShippingForm(true)}>
                  + Add Shipping Address
                </div>
              </div>
            ) : (
              <>
                {!showShippingForm && (
                  <div className='flex justify-between items-center'>
                    <div className='text-primary-black'>
                      <div>{`${profile?.first_name} ${profile?.last_name}`}</div>
                      <div>{`${profile?.shipping_address?.full_address}`}</div>
                      {profile?.phone && <div>{`${profile?.phone}`}</div>}
                    </div>
                    <div className='flex gap-2'>
                      <button type='button' onClick={() => handleEdit('shipping')}>
                        <MyxIcon name='edit' width={20} height={20} className='hover:text-primary-red' />
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDelete({ shipping_address: {}, is_shipping_address_equals_billing: false })}
                      >
                        <MyxIcon name='delete' width={20} height={20} className='hover:text-primary-red' />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {showShippingForm && (
            <div className='grid grid-cols-2 gap-6 mt-4 md:flex md:flex-col sm:flex sm:flex-col'>
              <div>
                <Label required text='Address' />
                <Input
                  placeholder='Street address'
                  {...register('shipping_address.address', { required: 'Address is required' })}
                />
                {errors?.shipping_address?.address && (
                  <span className='text-red-500'>{errors.shipping_address.address.message}</span>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <Label text='Region' required />
                <Controller
                  name='shipping_address.region'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      styles={customStyles}
                      value={regionOptions.find((option: TOption) => option.value === field.value)}
                      options={regionOptions}
                      placeholder='Region'
                      onChange={option => {
                        field.onChange((option as { value: string; label: string })?.value)
                        setValue('shipping_address.state', '')
                      }}
                    />
                  )}
                />
                {errors?.shipping_address?.region && (
                  <span className='text-red-500'>{errors.shipping_address.region.message}</span>
                )}
              </div>
              <div>
                <Label text='Apartment' required />
                <Input
                  placeholder='Aprt, Suite, Bldg.'
                  {...register('shipping_address.apartment', { required: 'Apartment is required' })}
                />
                {errors?.shipping_address?.apartment && (
                  <span className='text-red-500'>{errors.shipping_address.apartment.message}</span>
                )}
              </div>
              <div>
                <Label text='State' required />
                <Controller
                  name='shipping_address.state'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      styles={customStyles}
                      value={shippingStateOptions.find((option: TOption) => option.value === field.value) || null}
                      options={shippingStateOptions}
                      placeholder='State'
                      onChange={option => field.onChange((option as { value: string | number; label: string })?.value)}
                    />
                  )}
                />
                {errors?.shipping_address?.state && <span className='text-red-500'>{errors.shipping_address.state.message}</span>}
              </div>
              <div>
                <Label text='City' required />
                <Input placeholder='City' {...register('shipping_address.city', { required: 'City is required' })} />
                {errors?.shipping_address?.city && <span className='text-red-500'>{errors.shipping_address.city.message}</span>}
              </div>
              <div>
                <Label text='Zip code' required />
                <Input
                  placeholder='Zip code'
                  {...register('shipping_address.zip_code', {
                    pattern: {
                      value: /^[0-9]+(-[0-9]+)?$/,
                      message: 'Zip code must be a number or in the format 12345-6789',
                    },
                    minLength: {
                      value: 4,
                      message: 'Zip code must be at least 4 characters long',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Zip code must be no longer than 10 characters',
                    },
                  })}
                />
                {errors?.shipping_address?.zip_code && (
                  <span className='text-red-500'>{errors.shipping_address.zip_code.message}</span>
                )}
              </div>

              <div className='col-span-2 flex gap-4'>
                <Button type='submit'>Save</Button>
                <Button type='button' variant='blackUnderline' onClick={() => setShowShippingForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default AddressBookPage
