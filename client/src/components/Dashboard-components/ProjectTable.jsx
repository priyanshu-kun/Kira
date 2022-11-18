import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'

function ProjectTable({projects,handleProject}) {
  return (
    <>
            <table className="table w-4/5 mx-auto ">
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
                {

                  projects.map(({ _id, title, tags, projectLead }, index) => {
                    return (
                      <tr onClick={(e) => handleProject(_id)} key={_id} className="cursor-pointer hover:opacity-80 transition-all">
                        <th className='bg-slate-600/20 project-index opacity-60 text-center text-sm'>{index}</th>
                        <td className='bg-slate-600/20 project-title pl-6'>{title}</td>
                        <td className='bg-slate-600/20'>{
                          tags.map((b, idx) => <span key={idx} className="badge bg-button-main-light text-black mr-1">{b}</span>)
                        }</td>
                        <td className='bg-slate-600/20 text-blue-400 project-lead text-sm'>@{projectLead}</td>
                        <td className='bg-slate-600/20 text-center'>
                          <span className='w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-400/30 transition-all cursor-pointer'><FiMoreHorizontal className='text-2xl' /></span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
    </>
  )
}

export default ProjectTable