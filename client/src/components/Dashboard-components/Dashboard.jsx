import React, { useState } from 'react'
import { fetchProjectDetails } from '../../http'
import { useSelector } from "react-redux"
import ProjectModal from './Modals/ProjectModal';
import ProjectPlaceholder from './ProjectPlaceholder';
import ProjectTable from './ProjectTable';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import { useFetchProjects } from '../../hooks/useFetchProjects';

function Dashboard() {

  const { user: { id } } = useSelector(state => state.user);
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.projects);
  const [fetchingProjectFlag, setFetchingProjectFlag] = useState(false);
  const {loader} = useFetchProjects(fetchProjectDetails,id)


  const handleProject = async (id) => {
    navigate("/details/project/" + id)
  }



  return (
    <div className='h-[calc(100vh-4rem)] mt-16 w-full'>
      <div className='dashboard-right-header flex h-28 px-36 items-center justify-between border-b-2px border-solid border-b-white/5'>
        <h1 className='dashboard-right-header-title text-white text-2xl relative'>Projects</h1>
        {
          projects.length !== 0 && (
            < label htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
              <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
                Create
              </span>
            </label >
          )
        }
      </div>
      <div className='dashboard-right-body text-white mt-12 relative '>
        {
          loader ? <Preloader /> : projects.length == 0 ? <ProjectPlaceholder /> : <ProjectTable projects={projects} handleProject={handleProject} />
        }
        <ProjectModal fetchingProjectFlag={fetchingProjectFlag} setFetchingProjectFlag={setFetchingProjectFlag} />
      </div>
    </div>
  )
}

export default Dashboard