import React from 'react'
import PaginateComp from './PaginateComp'

function ProjectTable({ projects, handleProject }) {
  return (
    <>
      <table className="mx-auto w-4/5 ">
        <thead className='h-20 transform scale-105 text-left'>
          <tr>
            <th className="table-head-bg pl-2 text-center rounded-tl-lg rounded-bl-lg">No.</th>
            <th className="table-head-bg pl-10 py-2">Title</th>
            <th className="table-head-bg pl-6 py-2">Tag</th>
            <th className="table-head-bg pl-2 py-2">Lead</th>
            <th className="table-head-bg pl-8 py-2 rounded-tr-lg rounded-br-lg"></th>
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