import React from 'react'
import PackageCard from '../PackageCard/PackageCard'
import { packagesList } from '@/constants/packages'

const PackagesSection = () => {
  return (
    <div className='w-full bg-gray-450 pt-[72px]'>
      <div className='flex flex-col gap-[30px] items-center justify-center w-full md:pb-[120px] md:px-[15px]'>
        <div className='flex flex-col items-center'>
          <div className='uppercase text-gray-700 tracking-[5px] text-[57px] font-light suave-text'>PACKAGES</div>
          <div className='text-gray-700 suave-text'>Per Person</div>
        </div>
        <div className='flex items-center max-w-[1140px] w-full'>
          <div className='flex flex-wrap gap-x-[70px] justify-center gap-y-[60px] md:gap-x-5 md:grid md:grid-cols-2 md:gap-y-5 md:gap-x-5'>
            {packagesList.map(pkg => (
              <PackageCard key={pkg.title} item={pkg} />
            ))}
          </div>
        </div>
        <div className='flex flex-row gap-[70px] max-w-[1070px] w-full bg-white rounded-[14px]'>
          <div className='flex px-[60px] pt-[43px]'>
            <div className='flex flex-col'>
              <div className='text-secondary-main-red tracking-[3px] text-2xl font-light uppercase suave-text'>
                PACKAGE ADD-ONS
              </div>
              <div className='w-full h-[2px] border border-gray-550'></div>
              <ul className='pt-[17px] pl-[14px] text-sm leading-[43px] font-semibold' style={{ listStyleType: 'circle' }}>
                <li>Plumper Additive - $5</li>
              </ul>
            </div>
          </div>
          <div className='flex px-[60px] py-[43px]'>
            <div className='flex flex-col'>
              <div className='text-secondary-main-red tracking-[3px] text-2xl font-light uppercase suave-text'>
                ADDT’L MERCHANDISE
              </div>
              <div className='w-full h-[2px] border border-gray-550'></div>
              <ul className='pt-[17px] pl-[14px] text-sm leading-[43px] font-semibold' style={{ listStyleType: 'circle' }}>
                <li>Lip Scrubs - $20</li>
                <li>Balmshell Lip Balm - $40</li>
                <li>Small Makeup Case - $19.99</li>
                <li>Medium Makeup Case - $24.99</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackagesSection
