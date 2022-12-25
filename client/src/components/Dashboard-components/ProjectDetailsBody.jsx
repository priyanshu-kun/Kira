import React, { useEffect } from 'react'
import InviteModal from './Modals/InviteModal'
import { FiCopy } from 'react-icons/fi'
import { fetchProjectDetails } from '../../http'
import { useDispatch } from 'react-redux'
import { setProjectDetails } from '../../store/project.slice'
import { toast } from 'react-toastify'

function ProjectDetailsBody({ details,invitedUser, handleSendInvite }) {
  return (
    <div className='dashboard-right-body text-white mt-12'>
      <div className=' w-4/5 bg-black border-2px border-solid border-white/10 mx-auto mt-5 px-3 flex items-center justify-around h-28 rounded-3xl'>
        <h1 ><span className='font-exBold'>PROJECT ID:</span> {details?._id}
        </h1>
        <h1 className='flex items-center'> <span className='font-exBold'>LEAD: </span> @{details?.projectLead}
          <FiCopy className='ml-2 text-xl cursor-pointer' />
        </h1>
        <h1> <span className='font-exBold'>OWNER:</span>  {details?.owner}</h1>
        <div className='my-3 w-fit pl-12'>
          {details?.tags.map((m, idx) => <span key={idx} className='badge px-2 py-3 mr-3 uppercase font-bold text-sm'>{m}</span>)}</div>
      </div>
      <div className='issue-table-placeholder'>
        <div className='w-full flex flex-col items-center justify-center'>
          <img className=' mt-24 w-60 opacity-60 h-auto' src="https://jira-frontend-static.prod.public.atl-paas.net/assets/no-issues-glyph.949ad1d8fb4a226dbb5166d65ac12663.8.svg" alt="empty issues" />
          <h1 className='issue-e-msg mt-14 font-bold opacity-30 text-lg'>No issues were found matching your search.</h1>
        </div>
      </div>
      <div className='absolute  max-h-users-list  right-16   top-32  flex flex-col items-center justify-between overflow-hidden'>
        <div className='p-1 w-full  max-h-users-list bg-black rounded-3xl border-2px border-solid border-white/10 flex items-center justify-center overflow-scroll flex-col'>
          {
            invitedUser.length === 0? (
          <div className="avatar m-2">
            <div className=" w-16 mask mask-squircle">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
            ): (
              invitedUser.map(u => (
                <div className="avatar m-2">
                  <div className=" w-16 mask mask-squircle">
                    <img src={u.avatar} />
                  </div>
                </div>
              ))
            )
          }

        </div>
        <label htmlFor="my-modal-4" className="btn mt-3">Invite</label>
      </div>
      <InviteModal handleSendInvite={handleSendInvite} />
      {/* <ProjectModal fetchingProjectFlag={fetchingProjectFlag} setFetchingProjectFlag={setFetchingProjectFlag} /> */}
    </div>
  )
}

export default ProjectDetailsBody