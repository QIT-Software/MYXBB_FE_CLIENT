import { MyxIcon } from '@/components/icons'
import { mainNavigationLinks } from '@/constants/navigation'
import { Carousel } from 'react-responsive-carousel'
import { getUser } from '@/redux/slices/user/selectors'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const MainHeader = () => {
  const profile = useSelector(getUser)

  const slides = [
    { imageUrl: '/images/slide-one.webp' },
    { imageUrl: '/images/slide-two.webp' },
    { imageUrl: '/images/slide-three.webp' },
    { imageUrl: '/images/slide-four.webp' },
    { imageUrl: '/images/slide-five.webp' },
  ]

  return (
    <>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        renderArrowPrev={() => null}
        renderArrowNext={() => null}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li
              className={`dot ${isSelected ? 'bg-white' : 'bg-white/50'} w-3 h-3 rounded-full cursor-pointer`}
              onClick={onClickHandler}
              role='button'
              aria-label={`Go to slide ${index + 1}`}
              key={index}
            />
          )
        }}
        className='custom-carousel'
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className='relative w-full h-screen bg-cover bg-center'
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className='absolute top-[70px] right-[70px] flex justify-center items-center py-5'>
              <nav className='flex gap-6'>
                {mainNavigationLinks.map(item => (
                  <Link
                    href={item.link}
                    key={item.name}
                    className='hover:text-secondary-hover text-xs uppercase text-white font-bold tracking-widest'
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Link
                href='/profile'
                className='ml-6 size-8 overflow-hidden flex items-center justify-center bg-white/40 rounded-full cursor-pointer'
              >
                {profile?.avatar ? (
                  <Image src={profile?.avatar} alt='avatar' width={40} height={40} className='rounded-full' />
                ) : (
                  <MyxIcon name='user' className='w-8 h-8 flex items-center justify-center' />
                )}
              </Link>
            </div>
            <div className='suave-text absolute bottom-[190px] left-1/2 text-white transform -translate-x-1/2 uppercase text-6xl'>
              Make your Mark
            </div>
            <Link
              href='/booking'
              className='absolute bottom-[115px] left-1/2 transform -translate-x-1/2 uppercase w-[320px] bg-white/25 hover:bg-white/50 py-5 px-10 rounded-full text-xs font-black text-white tracking-wider'
            >
              Reserve Your Spot
            </Link>
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default MainHeader
