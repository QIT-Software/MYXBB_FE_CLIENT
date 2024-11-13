import { useEffect } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { getUser } from '@/redux/slices/user/selectors'
import { usePathname } from 'next/navigation'
import { mainNavigationLinks } from '@/constants/navigation'
import { MyxIcon } from '@/components/icons'

const HeroSection = () => {
  const profile = useSelector(getUser)
  const pathname = usePathname()

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

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      className='snap-block bg-red-500 relative flex justify-center items-center'
      style={{
        backgroundImage: "url('/images/exp-bg-one.webp')",
        backgroundPosition: '0% 50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Задаємо висоту секції на весь екран
      }}
    >
      <div className='absolute top-[70px] right-[70px] flex justify-center items-center py-5'>
        <nav className='flex gap-6'>
          {mainNavigationLinks.map(item => (
            <Link
              href={item.link}
              key={item.name}
              className={`hover:text-secondary-hover text-xs uppercase text-white font-bold tracking-widest ${
                pathname === item.link && 'text-secondary-hover'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Link
          href='/profile'
          className={`ml-6 size-8 overflow-hidden flex items-center
                 justify-center bg-white/40 rounded-full cursor-pointer ${!profile?.avatar && 'opacity-25'}`}
        >
          {profile?.avatar ? (
            <Image src={profile?.avatar} alt='avatar' width={40} height={40} className='rounded-full' />
          ) : (
            <MyxIcon name='user' className='w-[18px] h-[18px] flex items-center justify-center text-white' />
          )}
        </Link>
      </div>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={fadeInFromTop}
        className='flex flex-col gap-[10px] items-center absolute bottom-[15%] w-full max-w-[1400px] px-4 text-center md:max-w-[calc(100%-100px)] md:px-[15px]'
      >
        <div className='flex flex-col gap-[17px] items-center'>
          <h1 className='text-4xl text-white suave-text text-[60px] leading-[90px] md:text-[55px] sm:text-[28px]'>MYXPERIENCE</h1>
          <div className='w-[78px] border border-white'></div>
        </div>
        <p className='text-[21px] font-semibold leading-[3.544rem] text-white md:leading-[30px] md:text-[20px] sm:text-[20px] sm:leading-[20px]'>
          Make Your Mark with MYX Blend Bar! Our MYXologists are here to help you create your perfect lipstick blends! No matter
          the <br /> occasion, MYX Blend Bar has your lips covered! It&apos;s time for you to Choose It, MYX It &amp; Make It
          Yours!
        </p>
      </motion.div>
    </section>
  )
}

export default HeroSection
