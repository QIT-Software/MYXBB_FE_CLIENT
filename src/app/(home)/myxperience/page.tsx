'use client'
import { MyxIcon } from '@/components/icons'
import { mainNavigationLinks } from '@/constants/navigation'
import { getUser } from '@/redux/slices/user/selectors'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWithZoomInImages from './components/SectionWithZoomInImages/SectionWithZoomInImages'
import SectionWithAnimatedImages from './components/SectionWithAnimatedImages/SectionWithAnimatedImages'
import ReserveSpotSection from './components/ReserveSpotSection/ReserveSpotSection'
import HeroSection from './components/HeroSection/HeroSection'

const MyxperiencePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [
    '/images/slide-one.webp',
    '/images/slide-two.webp',
    '/images/slide-three.webp',
    '/images/slide-four.webp',
    '/images/slide-five.webp',
    '/images/slide-six.webp',
  ]

  const handleNext = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + images.length) % images.length)
  }

  return (
    <div className='snap-container no-scrollbar'>
      {/* Block 1 */}
      <HeroSection />
      {/* Block 2 */}
      <SectionWithAnimatedImages />
      {/* Block 3 */}
      <section className='relative snap-block bg-secondary-black-blue'>
        <div className='w-full flex flex-col gap-[70px] h-full pt-[100px] pl-[110px] pb-[80px] overflow-hidden'>
          <div className='flex gap-[125px] px-[20px]'>
            <div className='flex max-w-max w-full flex-col gap-[25px] items-start text-white'>
              <Image src={'/images/lips-logo.webp'} alt={'small lips'} width={50} height={32} className='object-cover' />
              <p className='suave-text uppercase text-[25px] tracking-[2.5px]'>MYX it Up</p>
              <div className='w-[78px] border border-secondary-main-red'></div>
            </div>
            <div className='flex flex-col max-w-[665px] w-full text-white'>
              <p className='suave-text uppercase text-[25px] tracking-[2.5px]'>MYX YOUR BASE + CUSTOM SHADE BLEND</p>
              <p className='text-[21px] font-semibold leading-[2.5rem]'>
                Now that you&apos;ve perfected your signature shade, you can further customize your creation by adding shimmers,
                glitters, custom fragrances, SPF, vitamins, anti-aging treatments, moisture, shine, and even plumper!
              </p>
            </div>
          </div>

          <div className='z-10 absolute flex gap-3 right-[50px] bottom-[500px]'>
            <div className='z-10 hover:opacity-50 cursor-pointer'>
              <Image
                onClick={handlePrev}
                src={'/images/slide-prev.png'}
                alt={'about-image-one'}
                width={35}
                height={17}
                className='object-cover '
              />
            </div>
            <div className='z-10 hover:opacity-50 cursor-pointer'>
              <Image
                onClick={handleNext}
                src={'/images/slide-next.png'}
                alt={'about-image-one'}
                width={35}
                height={17}
                className='object-cover'
              />
            </div>
          </div>

          <div className='relative w-full overflow-hidden bg-secondary-black-blue py-10'>
            <Carousel
              selectedItem={currentSlide}
              showArrows={false}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              onChange={index => setCurrentSlide(index)}
              centerMode={true}
              centerSlidePercentage={55}
              autoPlay={true}
            >
              {images.map((src, index) => (
                <div key={index} className='flex-shrink-0 px-2'>
                  <Image src={src} alt={`Slide ${index + 1}`} width={702} height={336} className='object-cover w-full h-auto' />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
      {/* Block 4 */}
      <SectionWithZoomInImages />
      {/* Block 5 */}
      <ReserveSpotSection />
    </div>
  )
}

export default MyxperiencePage
