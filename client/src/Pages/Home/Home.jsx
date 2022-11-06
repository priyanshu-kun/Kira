import React from 'react'
import Navbar from '../../components/Dashboard-components/Navbar'

function Home() {
  return (
    <div className=' min-h-screen max-h-screen text-black bg-black flex'>
      <Navbar />
      <div className='dashboard-left'></div>
      <div className='dashboard-right w-full'></div>
    </div>
  )
}

export default Home