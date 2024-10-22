import React from 'react'
import Link from 'next/link'

const BreadCrumbs = ({ paths, title }: any) => {
  return (
    <div className='w-full flex items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
      <div className='max-w-[1200px] w-full px-[50px] py-[25px] flex justify-center min-h-[200px]'>
        <nav className='text-gray-600 flex flex-col items-center justify-center gap-2.5'>
          <h1 className='text-[40px] font-bold suave-text'>{title}</h1>
          <ol className='list-reset flex text-sm'>
            {paths.map((path: any, index: any) => (
              <li key={index} className='flex items-center'>
                {index !== paths.length - 1 ? (
                  <>
                    <Link href={path.href}>
                      <p className='text-[13px] text-gray-900'>{path.label}</p>
                    </Link>
                    <span className='mx-2 text-gray-900'>/</span>
                  </>
                ) : (
                  <span className='text-gray-800'>{path.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default BreadCrumbs
