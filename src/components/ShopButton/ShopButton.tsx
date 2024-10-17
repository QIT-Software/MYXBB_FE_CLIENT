import Link from 'next/link'
import React from 'react'
import { MyxIcon } from '../icons'

type TShopButtonProps = {
  link: string
}
const ShopButton = ({ link }: TShopButtonProps) => {
  return (
    <Link
      href={link}
      className='flex max-w-[160px] w-full items-center justify-between py-[1.125rem]
       px-[1.563rem] shop-link-gradient capitalize rounded-[5px] text-base hover:bg-secondary-black-hover'
    >
      Shop now
      <MyxIcon name='chevronRight' className='size-5' />
    </Link>
  )
}

export default ShopButton