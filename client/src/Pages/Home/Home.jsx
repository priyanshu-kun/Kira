import React from 'react'
import Navbar from '../../components/Dashboard-components/Navbar'
import {useSelector} from "react-redux"

function Home() {


  const {user: {fullName,avatar}} = useSelector(state => state.user)


  return (
    <div className=' min-h-screen max-h-screen text-black bg-black flex'>
      <Navbar />
      <div className='dashboard-left mt-32 h-fit flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center flex-col'>
          <div className='w-28 h-28 rounded-3xl border-5px overflow-hidden border-solid border-accent-color'>
            <img className='w-full h-full object-cover' src={avatar} alt="user avatar" />
          </div>
          <p className='text-white mt-6  max-w-fullName relative text-xl dashboard-left-userFullName'>{fullName}</p>
        </div>
      </div>
      <div className='dashboard-right w-full'></div>
    </div>
  )
}

export default Home