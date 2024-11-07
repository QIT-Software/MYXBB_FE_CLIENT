import { useEffect } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const ReserveSpotSection = () => {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

  const zoomInEffect = {
    hidden: { opacity: 0, scale: 1.1 }, // Менше збільшення (1.1 замість 1.5)
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8, // Швидше (0.8 секунди)
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className='snap-block bg-experience-50 flex'>
      <div className='w-[60%] flex items-center justify-center'>
        <motion.div
          ref={ref}
          initial='hidden'
          animate={controls}
          variants={zoomInEffect}
          className='max-w-[669px] w-full py-[55px] pl-[100px] pr-[77px] text-white flex flex-col gap-[30px]'
        >
          <div className='flex flex-col gap-[15px] text-white'>
            <p className='suave-text uppercase text-[25px] tracking-[2.5px]'>RESERVE YOUR SPOT!</p>
            <p className='text-[21px] font-semibold leading-[2.5rem]'>
              Come visit us at our Houston location in Rice Village, or our Dallas location in West Village! We can&apos;t wait to
              MYX with you!
            </p>
          </div>
          <div className='flex gap-[30px]'>
            <Link
              href='/booking'
              className='uppercase text-experience-50 w-max bg-white py-5 px-[50px] rounded-full text-xs font-black tracking-wider'
            >
              Reserve Your Spot
            </Link>
            <Link
              href='/contact'
              className='uppercase text-experience-50 w-max bg-white py-5 px-[50px] rounded-full text-xs font-black tracking-wider'
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
      <div className='w-[40%] h-full'>
        <div
          style={{
            backgroundImage: "url('/images/auth-bg.webp')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
            height: '50vh',
          }}
        ></div>
        <div
          style={{
            backgroundImage: "url('/images/blue-lips.webp')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
            height: '50vh',
          }}
        ></div>
      </div>
    </section>
  )
}

export default ReserveSpotSection
