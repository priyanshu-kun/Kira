import React from 'react'
import Navbar from '../../components/Dashboard-components/Navbar'
import {FiHome, FiX, FiUser} from "react-icons/fi"
import { useSelector } from "react-redux"

function Home() {


  const { user: { fullName, avatar } } = useSelector(state => state.user)


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
        <ul className='mt-14  flex flex-col items-start'>
          {/* <button className="pushable normal-case mb-4 rounded-full">
                    <span className="front rounded-full text-white px-8 text-base w-48 py-4 bg-slate-600/20">
                      Dashboard
                    </span>
                  </button> */}
          <li><button className='text-white text-base mb-4 h-20 flex items-center justify-center px-8 w-48 bg-slate-600/20 hover:bg-slate-600/30 hover:transform hover:scale-95 rounded-full'><FiHome className='text-lg mr-2' />Dashboard</button></li>
          <li><button className='text-white text-base mb-4 h-16 flex items-center justify-center py-4 px-8 w-48 bg-slate-600/20 hover:bg-slate-600/30 hover:transform hover:scale-95 rounded-full'><FiX className='text-lg mr-2' />Closed Bugs</button></li>
          <li><button className='text-white text-base mb-4 h-16 flex items-center justify-center py-4 px-8 w-48 bg-slate-600/20 hover:bg-slate-600/30 hover:transform hover:scale-95 rounded-full'><FiUser className='text-lg mr-2' />Profile</button></li>
        </ul>
      </div>
      <div className='dashboard-right w-full'></div>
    </div>
  )
}

export default Home