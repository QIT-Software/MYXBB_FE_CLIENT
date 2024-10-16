import React from 'react'

const PackageCard = ({ item }: any) => {
  return (
    <div className='bg-white pt-[2.188rem] px-[3.75rem] max-w-[500px] w-full rounded-[14px] max-h-max'>
      <div className='flex flex-col'>
        <div className='text-gray-650 tracking-[3px] text-[27px] font-light uppercase suave-text'>{item.title}</div>
        <div className='w-full h-[2px] border border-gray-550'></div>
      </div>
      <div className='text-secondary-hover text-[19px] font-bold leading-[3.5rem]'>${item.price}</div>
      <div className='pt-3'>
        <ul className='pl-[14px] text-sm leading-[43px] font-semibold' style={{ listStyleType: 'circle' }}>
          {item.description.map((desc: string) => (
            <li key={desc}>{desc}</li>
          ))}
        </ul>
      </div>
      <div className='flex items-center justify-center pt-[89px]'>
        <div className='max-w-max bg-primary-red hover:bg-primary-black text-white text-xs tracking-[4px] uppercase rounded-t-[25px] py-[23px] px-[53px]'>
          Book Now
        </div>
      </div>
    </div>
  )
}

export default PackageCard
