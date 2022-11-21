import React from 'react'
import { FiCopy } from 'react-icons/fi'
import ProjectModal from './Modals/ProjectModal'

function ProjectDetails({ details }) {
  return (
    <div className='dashboard-right-body text-white mt-12'>
      <div className=' w-4/5 bg-black border-2px border-solid border-white/10 mx-auto mt-5 px-3 pt-8 pb-3 rounded-3xl'>
        <div className='flex w-full justify-around items-center'>
          <h1 className='flex items-center'>PROJECT ID: {details?._id} <FiCopy className='ml-2 text-xl cursor-pointer' /></h1>
          <h1>LEAD: @ {details?.projectLead}</h1>
          <h1>OWNER: {details?.owner}</h1>
        </div>
        <div className='divider'></div>
        <div className='avatars-list'>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
          <div className='avatar-comp'></div>
        </div>
        <div className='my-3 w-full pl-12'>{details?.tags.map(m => <span className='badge px-2 py-3 mr-3 uppercase font-bold text-sm'>{m}</span>)}</div>
      </div>
      {/* <ProjectModal fetchingProjectFlag={fetchingProjectFlag} setFetchingProjectFlag={setFetchingProjectFlag} /> */}
    </div>
  )
}

export default ProjectDetails