import React from 'react'
import image from "../../assets/dashboard-preloader.gif"

function Preloader() {
  return (
    <div className='flex items-center justify-center w-fit mx-auto mt-56'>
        <img src={image} alt="preloader" className=' w-16 h-auto rounded-full' />
    </div>
  )
}

export default Preloader