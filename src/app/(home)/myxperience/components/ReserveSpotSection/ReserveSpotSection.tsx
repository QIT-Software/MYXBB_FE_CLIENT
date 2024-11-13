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
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className='snap-block bg-experience-50 flex md:flex-col md:justify-between sm:flex-col sm:justify-between'>
      <div className='w-[60%] flex items-center justify-center md:w-full md:h-full sm:w-full sm:h-full'>
        <motion.div
          ref={ref}
          initial='hidden'
          animate={controls}
          variants={zoomInEffect}
          className='max-w-[669px] w-full py-[55px] pl-[100px] pr-[77px] text-white flex flex-col gap-[30px] 
          md:py-[75px] md:pr-[70px] md:max-w-full md:w-full sm:py-[40px] sm:px-[15px] sm:max-w-full sm:w-full'
        >
          <div className='flex flex-col gap-[15px] text-white'>
            <p className='suave-text uppercase text-[25px] tracking-[2.5px] md:text-[24px] sm:text-[20px] sm:text-center'>
              RESERVE YOUR SPOT!
            </p>
            <p className='text-[21px] font-semibold leading-[2.5rem] md:leading-[36px] sm:leading-[36px] sm:text-[18px] sm:leading-[34px] sm:text-center'>
              Come visit us at our Houston location in Rice Village, or our Dallas location in West Village! We can&apos;t wait to
              MYX with you!
            </p>
          </div>
          <div className='flex gap-[30px] md:flex-col sm:flex-col sm:items-center'>
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
      <div className='w-[40%] h-full md:w-full md:flex md:max-h-[320px] sm:w-full sm:flex sm:max-h-[440px] sm:flex-col'>
        <div
          className='md:w-[50%] md:max-h-[20px] sm:w-full sm:max-h-[220px]'
          style={{
            backgroundImage: "url('/images/auth-bg.webp')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
            height: '50vh',
          }}
        ></div>
        <div
          className='md:w-[50%] md:max-h-[320px] sm:w-full sm:max-h-[220px]'
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
