import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionWithZoomInImages = () => {
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

  const zoomInVariants = {
    hidden: { opacity: 0, scale: 1.2 },
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
    <section className='snap-block'>
      <div className='w-[60%] py-[55px] h-full pl-[100px] pr-[77px]'>
        <div className='flex w-full flex-col gap-[30px]'>
          <motion.div className='relative' ref={ref} initial='hidden' animate={controls} variants={zoomInVariants}>
            <Image
              src={'/images/exp-bg-five.webp'}
              alt={'lips bg'}
              width={546}
              height={355}
              className='w-full h-auto object-cover'
            />
            <div className='absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[25px] items-start'>
              <Image
                src={'/images/lips-logo.webp'}
                alt={'small lips'}
                width={50}
                height={32}
                className='object-cover mr-[35px]'
              />
              <p className='suave-text uppercase text-[25px] tracking-[2.5px] text-white'>Make it Yours</p>
              <div className='w-[78px] border border-white mr-[35px]'></div>
            </div>
          </motion.div>
          <div className='flex items-center gap-[30px] md:flex-col flex-row'>
            <motion.div className='w-full max-w-[1258px]' initial='hidden' animate={controls} variants={zoomInVariants}>
              <Image
                src={'/images/exp-bg-six.webp'}
                alt={'lips bg'}
                width={258}
                height={250}
                className='w-full h-auto object-cover'
              />
            </motion.div>
            <motion.div className='w-full max-w-[1258px]' initial='hidden' animate={controls} variants={zoomInVariants}>
              <Image
                src={'/images/exp-bg-seven.webp'}
                alt={'lips bg'}
                width={258}
                height={250}
                className='w-full h-auto object-cover'
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className='w-[40%] h-full bg-secondary-white flex items-center justify-center'>
        <p className='text-gray-700 leading-[2.5rem] max-w-[300px] w-full'>
          Choose from various lipstick mold shapes and even name your shade to truly make it yours. Once you’ve tested your custom
          creation and approved its awesomeness, your MYXologist will finalize your masterpiece!
        </p>
      </div>
    </section>
  )
}

export default SectionWithZoomInImages