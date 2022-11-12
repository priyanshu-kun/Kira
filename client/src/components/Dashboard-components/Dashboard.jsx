import React from 'react'
import ProjectModal from './Modals/ProjectModal'

function Dashboard() {
  return (
    <div className='h-[calc(100vh-4rem)] mt-16 w-full'>
      <div className='dashboard-right-header flex h-28 px-36 items-center justify-between border-b-2px border-solid border-b-white/5'>
        <h1 className='dashboard-right-header-title text-white text-2xl relative'>Projects</h1>
        < label htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
          <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
            Create
          </span>
        </label >
      </div>
      <div className='dashboard-right-body text-white mt-12'>
        <ProjectModal />
      </div>
    </div>
  )
}

export default Dashboard