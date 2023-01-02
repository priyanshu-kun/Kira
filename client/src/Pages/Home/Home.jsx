import React, { useState } from 'react'
import Navbar from '../../components/Dashboard-components/Navbar'
import Sidebar from '../../components/Dashboard-components/Sidebar'
import Dashboard from '../../components/Dashboard-components/Dashboard'
import TimelineBody from "../../components/Dashboard-components/Timeline"
import Profile from "../../components/Dashboard-components/Profile"

function Home() {

  const [tabs, setTabs] = useState(0)
  const handleTabs = (data) => {
    setTabs(data)
  }


  const map = {
    0: Dashboard,
    1: TimelineBody,
    2: Profile
  }

  const Component = map[tabs]

  return (
    <div className=' min-h-screen max-h-screen text-black bg-black flex relative'>
      <Navbar />
      <div className='cheap-ambient-mode w-full h-[330px] absolute'></div>
      <Sidebar handleTabs={handleTabs} tabs={tabs} />
      <div className='dashboard-right w-full ml-[350px]'>
        <Component />
      </div>
    </div>
  )
}

export default Home