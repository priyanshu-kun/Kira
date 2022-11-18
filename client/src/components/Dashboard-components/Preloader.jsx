import React from 'react'
import image from "../../assets/dashboard-preloader.svg"

function Preloader() {
  return (
    <div className='flex items-center justify-center w-fit mx-auto mt-56'>
        <img src={image} alt="preloader" className=' w-16 h-auto' />
    </div>
  )
}

export default Preloader