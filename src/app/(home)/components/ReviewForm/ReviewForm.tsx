import { useAddReviewMutation } from '@/api/Appointments'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { TProduct } from '@/types/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type TReviewFormProps = {
  product: TProduct
}
const ReviewForm = ({ product }: TReviewFormProps) => {
  const [addReview, { isSuccess }] = useAddReviewMutation()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<{ name: string; email: string }>({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  })

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleMouseEnter = (value: number) => {
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const onSubmit = async (data: any) => {
    try {
      const reviewData = {
        rating: rating,
        name: data.name,
        email: data.email,
        comment: review,
        product: product?.id,
      }

      await addReview({ id: product?.id, data: reviewData }).unwrap()
    } catch (err: any) {
      console.error('Failed to register: ', err)
    }
  }

  return (
    <div className='border-t border-gray-300'>
      <div className='flex flex-col gap-[30px]'>
        <h3 className='border-t-2 border-primary-hover-red text-secondary-dark-gray w-max pt-[20px]'>
          Reviews ({product?.reviews.length})
        </h3>
        <div className='flex flex-col gap-3'>
          {product?.reviews.map(el => (
            <div key={el.comment} className='flex gap-4 p-5 bg-secondary-white justify-between'>
              <div className='flex gap-4 items-center text-[15px]'>
                <div>
                  <Image src={'/images/avatar-placeholder.jpg'} width={60} height={60} alt={'avatar'} className='rounded-full' />
                </div>
                <div>
                  <div>{el.name}</div>
                  <div className='text-primary-gray'>{el.comment}</div>
                </div>
              </div>
              <div className='flex'>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-base ${index < el.rating ? 'text-primary-hover-red' : 'text-gray-300'}`}>
                    {index < el.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <p className='text-[15px] text-primary-gray'>Your email address will not be published. Required fields are marked *</p>
        </div>
      </div>
      {isSuccess ? (
        <div>Your review is being submitted</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
          <div className='mb-4 flex flex-col gap-[5px]'>
            <label className='text-[15px] text-secondary-dark-gray'>Your rating *</label>
            <div className='flex flex-wrap gap-4'>
              {[1, 2, 3, 4, 5].map(block => (
                <div
                  key={block}
                  className='flex pr-4 border-r  border-secondary-dark-gray items-center  cursor-pointer'
                  onClick={() => handleRatingClick(block)}
                  onMouseEnter={() => handleMouseEnter(block)}
                  onMouseLeave={handleMouseLeave}
                >
                  {[...Array(block)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-base ${
                        hoverRating === block || rating === block ? 'text-primary-hover-red' : 'text-gray-300'
                      }`}
                    >
                      {hoverRating === block || rating === block ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2.5'>
            <div>
              <Label text='Your review *' className='font-normal text-[15px] text-secondary-dark-gray' />
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded '
                rows={4}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label text='Name *' className='font-normal text-[15px] text-secondary-dark-gray' />
              <Input
                error={errors.name}
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
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label text='Email *' className='font-normal text-[15px] text-secondary-dark-gray' />
              <Input
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
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
            </div>
            <Button variant='redSubmit' type='submit' className='h-max py-3 px-[18px] w-max rounded-none pt-[10px]'>
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ReviewForm
