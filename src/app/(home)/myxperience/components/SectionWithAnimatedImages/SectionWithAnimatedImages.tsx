import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionWithAnimatedImages = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className='snap-block md:flex md:flex-col md:h-auto sm:flex sm:flex-col sm:h-auto'>
      <div className='py-[55px] h-full pl-[100px] pr-[77px] w-[55%] md:w-full md:p-[30px] md:h-auto sm:w-full sm:py-[30px] sm:px-[15px] sm:h-auto'>
        <div className='pb-[96px] flex flex-col gap-[25px] items-end md:pb-0 md:h-max md:gap-5 md:mb-5 sm:pb-[25px] sm:gap-[15px]'>
          <Image src={'/images/lips-logo.webp'} alt={'small lips'} width={50} height={32} className='object-cover mr-[35px] ' />
          <p className='suave-text uppercase text-[25px] tracking-[2.5px] text-gray-700 md:text-[24px] sm:text-[20px]'>
            Choose Your MYX
          </p>
          <div className='w-[78px] border border-secondary-main-red mr-[35px]'></div>
        </div>
        <div className='flex flex-col gap-[15px] text-gray-700'>
          <div className='suave-text uppercase text-[25px] tracking-[2.5px] sm:text-[20px]'>
            CHOOSE ONE OF OUR CUSTOM BLEND PACKAGES:
          </div>
          <p className='text-[21px] font-semibold leading-[2.5rem] sm:text-[18px] sm:leading-[2.125rem]'>
            You&apos;ll start your MYXperience by choosing how many custom blends you&apos;d like to create!
            <br />
            Next, choose from 8 distinct styles of lipstick and lip gloss! From liquid matte to lip balm, we&apos;ve got you
            covered!
            <br />
            Once you&apos;ve selected your style, your MYXologist will help you create a palette of custom shades that compliment
            your unique skin tone! You can test as many shades as your heart desires and adjust as you go to ensure your signature
            shade is perfect!
          </p>
        </div>
      </div>
      <div className='w-[45%] p-[75px] h-full bg-experience-25 md:w-full md:h-auto md:p-[30px] sm:w-full sm:h-auto sm:py-[20px] sm:px-[15px]'>
        <div className='flex flex-col items-center gap-[69px] md:gap-5 sm:gap-5' ref={ref}>
          <motion.div className='w-full' initial='hidden' animate={controls} variants={imageVariants}>
            <Image
              src={'/images/exp-bg-two.webp'}
              alt={'lips bg'}
              width={377}
              height={201}
              className='w-full h-auto object-cover md:max-h-[300px]'
            />
          </motion.div>
          <motion.div className='w-full md:min-h-[300px]' initial='hidden' animate={controls} variants={imageVariants}>
            <Image
              src={'/images/exp-bg-three.webp'}
              alt={'lips bg'}
              width={377}
              height={251}
              className='w-full h-auto object-cover md:max-h-[300px]'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SectionWithAnimatedImages
