import React from 'react'
import Video from "./assets/primaryLoader.mp4"

function PrimaryLoader() {
  return (
    <div className='w-full h-screen bg-preloader-bg relative flex items-center justify-center'>
        <video width="400" loop autoPlay muted>
        <source src={Video} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
        <h1 className='text-white loader-text absolute top-2/3 left-2/4 transform -translate-y-14 -translate-x-2/4 text-sm opacity-30'>You're already in my Genjutsu. Please Wait</h1>
    </div>
  )
}

export default PrimaryLoader