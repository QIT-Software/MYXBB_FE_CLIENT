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
    <section className='snap-block'>
      <div className='py-[55px] h-full pl-[100px] pr-[77px] w-[55%]'>
        <div className='pb-[96px] flex flex-col gap-[25px] items-end'>
          <Image src={'/images/lips-logo.webp'} alt={'small lips'} width={50} height={32} className='object-cover mr-[35px]' />
          <p className='suave-text uppercase text-[25px] tracking-[2.5px] text-gray-700'>Choose Your MYX</p>
          <div className='w-[78px] border border-secondary-main-red mr-[35px]'></div>
        </div>
        <div className='flex flex-col gap-[15px] text-gray-700'>
          <div className='suave-text uppercase text-[25px] tracking-[2.5px]'>CHOOSE ONE OF OUR CUSTOM BLEND PACKAGES:</div>
          <p className='text-[21px] font-semibold leading-[2.5rem]'>
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
      <div className='w-[45%] p-[75px] h-full bg-experience-25'>
        <div className='flex flex-col items-center gap-[69px]' ref={ref}>
          <motion.div className='w-full' initial='hidden' animate={controls} variants={imageVariants}>
            <Image
              src={'/images/exp-bg-two.webp'}
              alt={'lips bg'}
              width={377}
              height={201}
              className='w-full h-auto object-cover'
            />
          </motion.div>
          <motion.div className='w-full' initial='hidden' animate={controls} variants={imageVariants}>
            <Image
              src={'/images/exp-bg-three.webp'}
              alt={'lips bg'}
              width={377}
              height={251}
              className='w-full h-auto object-cover'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SectionWithAnimatedImages
