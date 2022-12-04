import React from 'react'
import PaginateComp from './PaginateComp'

function ProjectTable({ projects, handleProject }) {
  return (
    <>
      <table className="table h-auto w-4/5 mx-auto   ">
        <thead>
          <tr>
            <th className='bg-black cursor-pointer text-center rounded-tl-3xl'>No.</th>
            <th className='bg-black cursor-pointer pl-6'>Title</th>
            <th className='bg-black cursor-pointer'>Tags</th>
            <th className='bg-black cursor-pointer'>Lead</th>
            <th className='bg-black rounded-tr-3xl'></th>
          </tr>
        </thead>
        <tbody>
          <PaginateComp itemsPerPage={6} items={projects} handleProject={handleProject} />
        </tbody>
      </table>
    </>
  )
}

export default ProjectTable