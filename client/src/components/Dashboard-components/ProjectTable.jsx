import React from 'react'
import PaginateComp from './PaginateComp'

function ProjectTable({ projects, handleProject }) {
  return (
    <>
      <table className="mx-auto w-4/5 ">
          <thead className='text-left  w-full h-16'>
            <tr className=' w-full'>
              <th className="table-head-bg text-center rounded-tl-lg rounded-bl-lg">No.</th>
              <th className="table-head-bg pl-4 py-2">Title</th>
              <th className="table-head-bg pl-4 py-2">Tag</th>
              <th className="table-head-bg pl-4 py-2">Lead</th>
              <th className="table-head-bg pl-4 py-2 rounded-tr-lg rounded-br-lg"></th>
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