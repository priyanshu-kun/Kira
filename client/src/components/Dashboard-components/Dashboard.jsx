import React, { useState, useEffect } from 'react'
import { fetchUserProjects } from '../../http'
import { useSelector } from "react-redux"
import ProjectModal from './Modals/ProjectModal';
import {FiMoreHorizontal} from "react-icons/fi"

function Dashboard() {

  const { user: { id } } = useSelector(state => state.user);
  const [fetchingProjectFlag, setFetchingProjectFlag] = useState(false);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async () => {
      const { data: { data: projectsData } } = await fetchUserProjects(id)
      // check for if project are not avaliable
      setProjects(projectsData)
    })()
  }, [fetchingProjectFlag])


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
        <div className="overflow-x-auto">
          <table className="table w-4/5 mx-auto ">
            <thead>
              <tr>
                <th className='bg-black text-center'>No.</th>
                <th className='bg-black pl-6'>Title</th>
                <th className='bg-black'>Tags</th>
                <th className='bg-black'>Lead</th>
                <th className='bg-black'></th>
              </tr>
            </thead>
            <tbody>
              {

                projects.map(({title,tags,projectLead},index) => {
                  return (
                    <tr className="cursor-pointer ">
                      <th className='bg-slate-600/20 project-index opacity-60 text-center text-sm'>{index}</th>
                      <td className='bg-slate-600/20 project-title pl-6'>{title}</td>
                      <td className='bg-slate-600/20'>{
                        tags.map(b => <span className="badge bg-button-main-light text-black mr-1">{b}</span>)
                      }</td>
                      <td className='bg-slate-600/20 text-blue-400 project-lead text-sm'>@{projectLead}</td>
                      <td className='bg-slate-600/20 text-center'>
                        <span className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-400/30 transition-all cursor-pointer'>
                          <FiMoreHorizontal className=' text-2xl' />
                        </span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <ProjectModal fetchingProjectFlag={fetchingProjectFlag} setFetchingProjectFlag={setFetchingProjectFlag} />
      </div>
    </div>
  )
}

export default Dashboard