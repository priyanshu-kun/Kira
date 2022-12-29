import React, { useEffect, useState } from 'react'
import InviteModal from './Modals/InviteModal'
import { FiCopy, FiDisc } from 'react-icons/fi'
import { FaCheckCircle, FaComments, FaEllipsisH, FaLink, FaShare, FaTimesCircle, FaTrash } from 'react-icons/fa'
import { fetchAllBugsRelatedToProject, fetchProjectDetails, removeBugFromProject } from '../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectDetails } from '../../store/project.slice'
import { toast } from 'react-toastify'
import moment from "moment"
import { useNavigate } from "react-router-dom"
import copy from "copy-to-clipboard"

function ProjectDetailsBody({ details, invitedUser, handleSendInvite }) {


  const [projectBugs, setProjectBugs] = useState([])
  const [loader, setLoader] = useState(true)
  const [drawerValue, setDrawerValue] = useState(null)
  const [drawer, setDrawer] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data: { data: bugs } } = await fetchAllBugsRelatedToProject(details._id)
        setProjectBugs(prev => {
          return [...bugs]
        })
        setLoader(false)
      }
      catch (e) {
        setLoader(false)
        return toast.error("Cannot able to fetch projects.", {
          icon: "😓"
        })
      }
    })()
  }, [details])


  async function handleCopyLine(e,id) {
      const link = `http://localhost:5173/bug/${details?._id}/${id}`;
      copy(link)
      return toast.success("Link is copied to clipboard", {
        icon: "💥"
      })
  }

  async function handleRemoveBug(e,id) {
    try {
      await removeBugFromProject(id)
        const { data: { data: bugs } } = await fetchAllBugsRelatedToProject(details._id)
        setProjectBugs(prev => {
          return [...bugs]
        })
      return toast.success("The bug has been removed from the project.", {
        icon: "💥"
      })
    } 
    catch(e) {
        return toast.error("Cannot able to remove bug.", {
          icon: "😓"
        })
    }
  }

  function handleBugRoute(e, id) {
    navigate("/bug/"+details?._id+"/" + id)
  }

  return (
    <div className='dashboard-right-body text-white mt-12'>
      <div className=' w-4/5 bg-[#0a0a0a] border-2px border-solid border-white/10 mx-auto mt-5 px-3 flex items-center justify-around h-28 rounded-3xl'>
        <h1 ><span className='font-exBold'>PROJECT ID:</span> {details?._id}
        </h1>
        <h1 className='flex items-center'> <span className='font-exBold'>LEAD: </span> @{details?.projectLead}
          <FiCopy className='ml-2 text-xl cursor-pointer' />
        </h1>
        <h1> <span className='font-exBold'>OWNER:</span>  {details?.owner}</h1>
        <div className='my-3 w-fit pl-12'>
          {details?.tags.map((m, idx) => <span key={idx} className='badge px-2 py-3 mr-3 uppercase font-bold text-sm'>{m}</span>)}</div>
      </div>
      {
        projectBugs.length === 0 ? (
          <div className='issue-table-placeholder'>
            <div className='w-full flex flex-col items-center justify-center'>
              <img className=' mt-24 w-60 opacity-60 h-auto' src="https://jira-frontend-static.prod.public.atl-paas.net/assets/no-issues-glyph.949ad1d8fb4a226dbb5166d65ac12663.8.svg" alt="empty issues" />
              <h1 className='issue-e-msg mt-14 font-bold opacity-30 text-lg'>No issues were found matching your search.</h1>
            </div>
          </div>
        ) : (
          <>
            <table className="mx-auto w-4/5 mt-12">
              <thead className='text-left w-full border-b-2px border-solid border-white/10'>
                <tr className='w-full'>
                  <th className="pl-4 pb-2">Name</th>
                  <th className="pl-4 pb-2">Reporter</th>
                  <th className="pl-4 pb-2">Type</th>
                  <th className="pl-4 pb-2">Priority</th>
                  <th className="pl-4 pb-2">Severity</th>
                  <th className="pl-4 pb-2">Created</th>
                  <th className="pl-4 pb-2"><FaComments /></th>
                  <th className="pl-4 pb-2">Resolution</th>
                  <th className="pl-4 pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {
                  projectBugs.map(bug => {
                    return (
                      <tr key={bug._id} onClick={(e) => handleBugRoute(e, bug._id)} className="border-b-2px bg-white/5 border-b-solid border-b-white/10 h-16  cursor-pointer hover:bg-white/10 transition-all">
                        <td className="px-4 py-2 table-title shadow-table-side">{bug.Name}</td>
                        <td className="px-4 py-2 text-sm font-black text-blue-400">@{bug.ReporterName}</td>
                        <td className="px-4 py-2">{bug.Type}</td>
                        <td className="px-4 py-2">{bug.Priority}</td>
                        <td className='px-4 py-2'>{bug.Severity}</td>
                        <td className='px-4 py-2'>{moment(bug.createdAt).format("MMM D, YYYY")}</td>
                        <td className='px-4 py-2'>12</td>
                        <td className='px-4 py-2'>{!bug.isResolve ? <span className='flex items-center'>Open<FaCheckCircle className='ml-2 text-green-400' /></span> : <span className='flex items-center' >Closed<FaTimesCircle className='ml-2 text-red-400' /></span>}</td>
                        <td className='py-4 px-2 relative'>
                          <span onClick={(e) => {
                            e.stopPropagation()
                            if (drawer) {
                              setDrawerValue(bug._id)
                              setDrawer(false)
                            }
                            else {
                              setDrawerValue(null)
                              setDrawer(true)
                            }
                          }} className='relative w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/30 '><FaEllipsisH />
                            <div className={`absolute flex px-6 py-4 top-8 rounded-xl z-50 left-0 bg-[#0a0a0a] border-[3px] border-solid border-white/10  ${drawerValue === bug._id ? "block" : "hidden"}`}><span onClick={(e) => {
                                handleCopyLine(e,bug._id)
                            }}><FaLink className='mr-8 hover:text-green-400' /></span><span onClick={(e) => handleRemoveBug(e,bug._id)}><FaTrash className='hover:text-red-400' /></span></div>
                          </span>
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
      <div className='absolute  max-h-users-list  right-16   top-32  flex flex-col items-center justify-between overflow-hidden'>
        <div className='p-1 w-full  max-h-users-list bg-black rounded-3xl border-2px border-solid border-white/10 flex items-center justify-center overflow-scroll flex-col'>
          {
            invitedUser.map((u, index) => (
              <div key={index} className="avatar m-2">
                <div className=" w-16 mask mask-squircle">
                  <img src={u.avatar} />
                </div>
              </div>
            ))
          }
        </div>
        <label htmlFor="my-modal-4" className="btn mt-3">Invite</label>
      </div>
      <InviteModal handleSendInvite={handleSendInvite} />

    </div>
  )
}

export default ProjectDetailsBody