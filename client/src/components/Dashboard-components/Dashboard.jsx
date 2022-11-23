import React, { useState, useEffect } from 'react'
import { fetchProjectDetails, fetchUserProjects } from '../../http'
import { useSelector, useDispatch } from "react-redux"
import ProjectModal from './Modals/ProjectModal';
import { FiCopy, FiMoreHorizontal, FiTrash, FiArrowLeft } from "react-icons/fi"
import { setProjectDetails, setProjects } from '../../store/project.slice';
import ProjectPlaceholder from './ProjectPlaceholder';
import ProjectTable from './ProjectTable';
import { toast } from 'react-toastify';
import Preloader from './Preloader';
import ProjectDetails from './ProjectDetails';

function Dashboard() {

  const { user: { id } } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { projects, details } = useSelector(state => state.projects);
  const [fetchingProjectFlag, setFetchingProjectFlag] = useState(false);
  const [preloader, setPreloader] = useState(true);
  const [componentMap, setComponentMap] = useState(0);

  const Comp = {
    0: ProjectTable,
    1: ProjectDetails
  }


  useEffect(() => {
    (async () => {
      try {
        const { data: { data: projectsData } } = await fetchUserProjects(id)
        if (projectsData) {
          setPreloader(!preloader);
        }
        dispatch(setProjects(projectsData))
      }
      catch (e) {
        setPreloader(!preloader);
        return toast.error("Cannot able to fetch projects.", {
          icon: "😓"
        })
      }
    })()
  }, [fetchingProjectFlag])


  useEffect(() => {
    if (details !== null) {
      setComponentMap(1)
    }
    if (details === null) {
      setComponentMap(0)
    }
  }, [details])


  const handleProject = async (id) => {
    try {
      const { data: { data: Details } } = await fetchProjectDetails(id)

      dispatch(setProjectDetails(Details));
    }
    catch (e) {
      return toast.error("Cannot able to fetch details.", {
        icon: "😓"
      })
    }
  }

  const handleDetailsClick = (e) => {
    e.preventDefault();
    dispatch(setProjectDetails(null));
  }


  const Component = Comp[componentMap];


  return (
    <div className='h-[calc(100vh-4rem)] mt-16 w-full'>
      <div className='dashboard-right-header flex h-28 px-36 items-center justify-between border-b-2px border-solid border-b-white/5'>
        <div className='flex items-center justify-center'>
          {
            details !== null && (
              <button onClick={handleDetailsClick} className='btn mr-6 cursor-pointer bg-transparent border border-solid border-white/10 rounded-full hover:bg-transparent hover:border-transparent transition-all transform hover:-translate-x-2'><FiArrowLeft className='text-white text-3xl' /></button>
            )
          }
          <h1 className='dashboard-right-header-title text-white text-2xl relative'>{details !== null ? details.title : "Projects"}</h1>
        </div>
        {
          details !== null ? (
            < label htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
              <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
                Create Issue
              </span>
            </label >
          ) : (
            projects.length !== 0 && (
              < label htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
                <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
                  Create
                </span>
              </label >
            )
          )
        }
      </div>
      <div className='dashboard-right-body text-white mt-12 relative'>
        {
          preloader ? <Preloader /> : <Component projects={projects} handleProject={handleProject} details={details} />
        }
        <ProjectModal fetchingProjectFlag={fetchingProjectFlag} setFetchingProjectFlag={setFetchingProjectFlag} />
      </div>
    </div>
  )
}

export default Dashboard