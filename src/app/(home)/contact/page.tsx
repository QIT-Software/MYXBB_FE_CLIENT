'use client'
import { useContactFormMutation } from '@/api/Auth'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { contactList } from '@/constants/contacts'
import { TContactForm } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const ContactPage = () => {
  const [contactForm, { isSuccess }] = useContactFormMutation()
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TContactForm>({
    mode: 'onChange',
  })

  const onSubmit = (data: TContactForm) => {
    try {
      contactForm(data).unwrap()
    } catch (err: any) {
      console.error('Failed to contact: ', err)
    }
  }
  return (
    <div className='w-full flex bg-gray-25'>
      <div
        className='w-2/5 bg-cover flex bg-center justify-center'
        style={{
          backgroundImage: "url('/images/checkout-bg.webp')",
          backgroundSize: 'cover',
          backgroundRepeat: ' no-repeat',
          backgroundPosition: '50%',
        }}
      >
        <div className='max-w-[400px] w-full flex items-center justify-center flex-col gap-[70px] py-[65px]'>
          <div className='suave-text tracking-[6px] text-[30px] text-white'>STAY IN THE MYX</div>
          <div className='flex flex-col gap-[55px]'>
            <div className='border-l-2 border-white pl-[25px] flex flex-col gap-[30px]'>
              <Link href={'mailto:9k4yX@example.com'} className='text-white font-light text-[15px] hover:opacity-80'>
                E : myx@myxblendbar.com
              </Link>
            </div>
            {contactList.map((item, index) => (
              <div key={`${item[0]}-${index}`} className='border-l-2 border-white pl-[25px] flex flex-col gap-[30px]'>
                {Array.isArray(item) &&
                  item.map(contact => (
                    <div key={contact} className='text-white font-light text-[15px]'>
                      {contact}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-3/5 pt-[60px] flex justify-center'>
        <div className='flex flex-col max-w-[500px] w-full items-center gap-8'>
          <h1 className='suave-text text-gray-700 text-[30px] uppercase tracking-[6px]'>Contact Form</h1>
          {!isSuccess ? (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full items-center justify-between '>
              <div className='w-full flex flex-col gap-6'>
                <Input
                  error={errors.name}
                  placeholder='Enter name'
                  type='name'
                  id='name'
                  {...register('name', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters long',
                    },
                    maxLength: {
                      value: 30,
                      message: 'First name must be no longer than 30 characters',
                    },
                    pattern: {
                      value: /^[^\s](.*[^\s])?$/,
                      message: 'First name cannot start or end with a space',
                    },
                  })}
                  className={`text-sm !bg-transparent block w-full px-3 py-2 border border-gray-125 !rounded-none
                focus:outline-none text-gray-700`}
                />
                <Input
                  placeholder='Enter mail'
                  type='email'
                  id='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                    validate: value => {
                      const noCyrillic = /^[^\u0400-\u04FF]+$/.test(value)
                      return noCyrillic || 'Email must not contain Cyrillic characters'
                    },
                  })}
                  className={`text-sm !bg-transparent block w-full px-3 py-2 border border-gray-125 !rounded-none
                focus:outline-none text-gray-700`}
                />
                <Textarea
                  placeholder='Additional Information'
                  {...register('comment', { required: 'Comment is required' })}
                  className='!bg-transparent text-sm w-full h-[230px] p-2 border border-gray-125 !rounded-none resize-none outline-none focus:ring-1 focus:ring-transparent'
                />
              </div>
              <Button
                type='submit'
                className='!h-max max-w-max bg-primary-red hover:bg-primary-black text-white text-[10px] tracking-[3px] uppercase rounded-[25px] py-[23px] px-[75px]'
              >
                <p>Submit</p>
              </Button>
            </form>
          ) : (
            <div>Your message has been sent</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
