import React, { useState } from 'react'
import { FiHome, FiX, FiUser } from "react-icons/fi"
import { useSelector } from "react-redux"

function Sidebar({handleTabs,tabs}) {

    const { user: { fullName, avatar } } = useSelector(state => state.user)

    return (
        <div className='dashboard-left h-screen fixed flex flex-col items-center justify-center z-40 bg-black'>
            <div className='flex items-center justify-center flex-col'>
                <div className='w-28 h-28 rounded-3xl border-5px overflow-hidden border-solid border-button-main-light'>
                    <img className='w-full h-full object-cover' src={avatar} alt="user avatar" />
                </div>
                <p className='text-white mt-6  max-w-fullName relative text-xl dashboard-left-userFullName'>{fullName}</p>
            </div>
            <ul className='mt-14  flex flex-col items-start'>
                <li><button onClick={() => handleTabs(0)} className={` text-base mb-4  flex items-center justify-center w-48     rounded-full ${tabs === 0 ? "h-20 border-2px border-solid border-button-main-light text-button-main-light bg-none hover:bg-none hover:text-button-main-light" : "h-16 border-none text-white bg-slate-600/20 hover:bg-slate-600/30 hover:text-button-main-light"}`}><FiHome className='text-lg mr-2 ' />Dashboard</button></li>
                <li><button onClick={() => handleTabs(1)} className={` text-base mb-4  flex items-center justify-center w-48     rounded-full ${tabs === 1 ? "h-20 border-2px border-solid border-button-main-light text-button-main-light bg-none hover:bg-none hover:text-button-main-light" : "h-16 border-none text-white bg-slate-600/20 hover:bg-slate-600/30 hover:text-button-main-light"}`}><FiX className='text-lg mr-2' />Timeline</button></li>
                <li><button onClick={() => handleTabs(2)} className={` text-base mb-4  flex items-center justify-center w-48     rounded-full ${tabs === 2 ? "h-20 border-2px border-solid border-button-main-light text-button-main-light bg-none hover:bg-none hover:text-button-main-light" : "h-16 border-none text-white bg-slate-600/20 hover:bg-slate-600/30 hover:text-button-main-light"}`}><FiUser className='text-lg mr-2' />Profile</button></li>
            </ul>
        </div>
    )
}

export default Sidebar