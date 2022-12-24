import React, { useState, useEffect } from 'react'
import { fetchProjectDetails, fetchUserProjects } from '../../http'
import { useSelector, useDispatch } from "react-redux"
import ProjectModal from './Modals/ProjectModal';
import { FiCopy, FiMoreHorizontal, FiTrash, FiArrowLeft } from "react-icons/fi"
import { setProjectDetails, setProjects } from '../../store/project.slice';
import ProjectPlaceholder from './ProjectPlaceholder';
import ProjectTable from './ProjectTable';
import { toast } from 'react-toastify';
import ProjectDetails from './ProjectDetails';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';

function Dashboard() {

  const { user: { id } } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.projects);
  const [fetchingProjectFlag, setFetchingProjectFlag] = useState(false);
  const [loader,setLoader] = useState(true);



  useEffect(() => {
    (async () => {
      try {
        const { data: { data: projectsData } } = await fetchUserProjects(id)
        dispatch(setProjects(projectsData))
        setLoader(false)
      }
      catch (e) {
        setLoader(false)
        return toast.error("Cannot able to fetch projects.", {
          icon: "😓"
        })
      }
    })()
  }, [fetchingProjectFlag])



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