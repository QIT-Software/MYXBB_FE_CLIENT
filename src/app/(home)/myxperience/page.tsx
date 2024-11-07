'use client'
import { MyxIcon } from '@/components/icons'
import { mainNavigationLinks } from '@/constants/navigation'
import { getUser } from '@/redux/slices/user/selectors'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'

const MyxperiencePage = () => {
  const profile = useSelector(getUser)
  const pathname = usePathname()
  return (
    <div className='snap-container no-scrollbar'>
      {/* Block 1 */}
      <section
        className='snap-block bg-red-500 relative'
        style={{
          backgroundImage: "url('/images/exp-bg-one.webp')",
          backgroundPosition: ' 0% 50%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='absolute top-[70px] right-[70px] top-[70px] right-[70px] flex justify-center items-center py-5'>
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
        <div className='absolute max-w-[1400px] w-full left-[50%] bottom-[115px] translate-x-[-50%]'>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-col gap-[17px] items-center'>
              <h1 className='text-4xl text-white suave-text text-[60px] leading-[90px]'>MYXPERIENCE</h1>
              <div className='w-[78px] border border-white'></div>
            </div>
            <p className='text-[21px] font-semibold leading-[3.544rem] text-white text-center'>
              Make Your Mark with MYX Blend Bar! Our MYXologists are here to help you create your perfect lipstick blends! No
              matter the <br /> occasion, MYX Blend Bar has your lips covered! It&apos;s time for you to Choose It, MYX It &amp;
              Make It Yours!
            </p>
          </div>
        </div>
      </section>
      {/* Block 2 */}
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
              You&apos;ll start your MYXperience by choosing how many custom blends you&apos;`d like to create!
              <br />
              Next, choose from 8 distinct styles of lipstick and lip gloss! From liquid matte to lip balm, we&apos;ve got you
              covered!
              <br />
              Once you&apos;ve selected your style, your MYXologist will help you create a palette of custom shades that
              compliment your unique skin tone! You can test as many shades as your heart desires and adjust as you go to ensure
              your signature shade is perfect!
            </p>
          </div>
        </div>
        <div className='w-[45%] p-[75px] h-full bg-experience-25'>
          <div className='flex flex-col items-center gap-[69px]'>
            <Image
              src={'/images/exp-bg-two.webp'}
              alt={'lips bg'}
              width={377}
              height={201}
              className='w-full h-auto object-cover'
            />
            <Image
              src={'/images/exp-bg-three.webp'}
              alt={'lips bg'}
              width={377}
              height={251}
              className='w-full h-auto object-cover'
            />{' '}
          </div>
        </div>
      </section>
      {/* Block 3 */}
      <section className='snap-block bg-secondary-black-blue'>
        <div className='w-full flex flex-col gap-[70px] h-full pt-[100px] pl-[110px] pb-[80px]'>
          <div className='flex gap-[125px]'>
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

          {/* Slider Section */}
          <div className='w-full max-w-[1200px] mx-auto relative'>
            {/* Обмежуємо ширину каруселі */}
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={3000}
              renderArrowPrev={(clickHandler, hasPrev) =>
                hasPrev && (
                  <button
                    type='button'
                    onClick={clickHandler}
                    className='absolute top-[50%] left-[-20px] bg-white rounded-full p-2 z-10'
                  >
                    &#8592;
                  </button>
                )
              }
              renderArrowNext={(clickHandler, hasNext) =>
                hasNext && (
                  <button
                    type='button'
                    onClick={clickHandler}
                    className='absolute top-[50%] right-[-20px] bg-white rounded-full p-2 z-10'
                  >
                    &#8594;
                  </button>
                )
              }
            >
              <div className='flex'>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-one.webp'}
                    alt={'Slide 1'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-two.webp'}
                    alt={'Slide 2'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-three.webp'}
                    alt={'Slide 3'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-four.webp'}
                    alt={'Slide 4'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-five.webp'}
                    alt={'Slide 5'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='w-1/3 p-2'>
                  <Image
                    src={'/images/slide-six.webp'}
                    alt={'Slide 6'}
                    width={400}
                    height={250}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      {/* Block 4 */}
      <section className='snap-block'>
        <div className='w-[60%] py-[55px] h-full pl-[100px] pr-[77px]'>
          <div className='flex w-full flex-col gap-[30px]'>
            <div className='relative'>
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
            </div>
            <div className='flex items-center gap-[30px] md:flex-col flex-row'>
              <Image
                src={'/images/exp-bg-six.webp'}
                alt={'lips bg'}
                width={258}
                height={250}
                className='w-full h-auto object-cover max-w-[1258px]' // Адаптивне зображення з максимальними розмірами
              />
              <Image
                src={'/images/exp-bg-seven.webp'}
                alt={'lips bg'}
                width={258}
                height={250}
                className='w-full h-auto object-cover max-w-[1258px]' // Адаптивне зображення з максимальними розмірами
              />
            </div>
          </div>
        </div>
        <div className='w-[40%] h-full bg-secondary-white flex items-center justify-center'>
          <p className='text-gray-700 leading-[2.5rem] max-w-[300px] w-full'>
            Choose from various lipstick mold shapes and even name your shade to truly make it yours. Once you’ve tested your
            custom creation and approved its awesomeness, your MYXologist will finalize your masterpiece!
          </p>
        </div>
      </section>
      {/* Block 5 */}
      <section className='snap-block bg-experience-50 flex'>
        <div className='w-[60%] flex items-center justify-center'>
          <div className='max-w-[669px] w-full py-[55px] pl-[100px] pr-[77px] text-white flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[15px] text-white'>
              <p className='suave-text uppercase text-[25px] tracking-[2.5px]'>RESERVE YOUR SPOT!</p>
              <p className='text-[21px] font-semibold leading-[2.5rem]'>
                Come visit us at our Houston location in Rice Village, or our Dallas location in West Village! We can&apos;t wait
                to MYX with you!
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
                contact us
              </Link>
            </div>
          </div>
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
    </div>
  )
}

export default MyxperiencePage
