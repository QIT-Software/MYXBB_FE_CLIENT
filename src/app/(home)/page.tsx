import React from 'react'
import AboutSection from './components/AboutSection/AboutSection'
import PackagesSection from './components/PackagesSection/PackagesSection'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <AboutSection />
      <PackagesSection />
    </div>
  )
}

export default Home
