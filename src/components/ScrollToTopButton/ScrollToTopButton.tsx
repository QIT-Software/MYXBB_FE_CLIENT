import React from 'react'
import { MyxIcon } from '../icons'

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button onClick={scrollToTop} className='fixed bottom-4 left-4 p-2 text-white shadow-lg bg-primary-black opacity-40'>
      <MyxIcon name='arrow' className='text-primary-white size-6 rotate-90' />
    </button>
  )
}

export default ScrollToTopButton
