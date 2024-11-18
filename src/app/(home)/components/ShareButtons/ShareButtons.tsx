import { MyxIcon } from '@/components/icons'
import React from 'react'

const ShareButtons = ({ productName, productUrl }: { productName: string; productUrl: string }) => {
  const encodedUrl = encodeURIComponent(productUrl)
  const encodedText = encodeURIComponent(productName)

  const shareLinks = {
    twitter: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText} ${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  return (
    <div className='flex gap-1'>
      <a
        href={shareLinks.twitter}
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'
      >
        <MyxIcon name='twitter' className='size-4' />
      </a>
      <a
        href={shareLinks.pinterest}
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'
      >
        <MyxIcon name='pinterest' className='size-4' />
      </a>
      <a
        href={shareLinks.linkedin}
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'
      >
        <MyxIcon name='linkedin' className='size-4' />
      </a>
      <a
        href={shareLinks.whatsapp}
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'
      >
        <MyxIcon name='whatsapp' className='size-4' />
      </a>
      <a
        href={shareLinks.facebook}
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer w-[50px] h-[30px] flex items-center justify-center border border-secondary-light-blue/3'
      >
        <MyxIcon name='facebookShare' className='size-4' />
      </a>
    </div>
  )
}

export default ShareButtons
