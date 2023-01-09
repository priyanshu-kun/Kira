import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  invitePerson } from '../../http'
import ProjectModal from './Modals/ProjectModal'
import ProjectDetailsBody from './ProjectDetailsBody'
import Preloader from './Preloader';
import { FiArrowLeft } from 'react-icons/fi'
import Navbar from './Navbar'
import IssueModal from './Modals/IssueModal'
import { useFetchProjectDetails } from '../../hooks/useFetchProjectDetails'

function ProjectDetails() {


  const { id } = useParams()
  const navigate = useNavigate()
  const {
    details,
    loader,
    invitedUser
  } = useFetchProjectDetails(id)


  async function handleSendInvite(e, data) {
    e.preventDefault()
    const inviteInfo = {
      invitationKey: data,
      projectId: id
    }
    try {
      const { data } = await invitePerson(inviteInfo)
      return toast.success("Email Sent, Please check the inbox", {
        icon: "📨"
      })
    }
    catch (e) {
      return toast.error("Cannot able to send invitation.", {
        icon: "😓"
      })
    }
  }




  return (
    <>
      <Navbar />
      <div className='h-[calc(100vh-4rem)] mt-16 w-full bg-black'>
        <div className='dashboard-right-header flex h-28 px-36 items-center justify-between border-b-2px border-solid border-b-white/5'>
          <div className='flex items-center justify-center'>
            <button onClick={() => {
              navigate("/")
            }} className='btn mr-6 cursor-pointer bg-transparent border border-solid border-white/10 rounded-full hover:bg-transparent hover:border-transparent transition-all transform hover:-translate-x-2'><FiArrowLeft className='text-white text-3xl' /></button>
            <h1 className='dashboard-right-header-title text-white text-2xl relative'>{details?.title}</h1>
          </div>
          < label htmlFor="create-issue" className="pushable normal-case bg-green-600 rounded-full">
            <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
              Create Issue
            </span>
          </label >
        </div>
        <div className='dashboard-right-body text-white mt-12 relative '>
          {
            loader ? <Preloader /> : <ProjectDetailsBody details={details} invitedUser={invitedUser} handleSendInvite={handleSendInvite} />
          }
          <ProjectModal />
          <IssueModal />
        </div>
      </div>
    </>

  )
}

export default ProjectDetails