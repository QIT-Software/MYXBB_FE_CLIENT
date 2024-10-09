import React from 'react'
import { navigationLinks } from '@/constants/navigation'
import Link from 'next/link'

const Navigation = () => {
  return (
    <div className='flex text-secondary-white pb-[1.375rem] flex-col justify-between'>
      <ul className='flex gap-9'>
        {navigationLinks.map(item => (
          <li key={item.name} className='uppercase font-black'>
            <Link className='text-xs' href={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* <div>social</div> */}
    </div>
  )
}

export default Navigation
