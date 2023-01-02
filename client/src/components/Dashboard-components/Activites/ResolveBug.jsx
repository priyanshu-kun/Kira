import moment from 'moment'
import React from 'react'
import { fetchTimelineActivites } from '../../../http';
import { unResolveBug } from '../../../http';
import { useDispatch, useSelector } from 'react-redux';
import { setTimelineActivites } from '../../../store/timeline.slice';

function ResolveBug({ activity, setLoader, setDocumentCount, setTotalPages }) {

  const dispatch = useDispatch()

  async function handleResolve(id,activityId) {
    try {
      const { data } = await unResolveBug(id,activityId);
      setLoader(true)
      const { data: { data: { count, activites, totalPages } } } = await fetchTimelineActivites(0, 6)
      setTotalPages(totalPages)
      dispatch(setTimelineActivites(activites))
      setDocumentCount(count)
      setLoader(false)
    }
    catch (e) {
      setLoader(false)
    }
  }

  return (
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-4 justify-center items-center  bg-accent-color rounded-full ring-2 ring-accent-color w-8 h-8">
        <img className="rounded-full shadow-lg w-full h-full object-cover" src={activity.avatar} alt="Bonnie image" />
      </span>
      <div className="justify-between items-center p-4  rounded-lg border-2px border-white/10 shadow-sm sm:flex bg-[#121212]">
        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{moment(activity.time).format("MMM D, YYYY / h:mm:ss a")}</time>
        <div className='flex items-center'>
          {
            activity.isResolve.flag ? (
              <button onClick={(e) => handleResolve(activity.isResolve.bugId,activity._id)} className='btn bg-green-400 hover:bg-green-500 text-black w-24 normal-case mr-3'>UnResolve</button>
            ) : (
              <button className='btn bg-gray-600 hover:bg-gray-600 pointer-events-none text-white w-24 normal-case mr-3'>UnResolve</button>
            )
          }
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300"><a href={"http://localhost:5173" + activity.link} className="font-semibold text-blue-600 dark:text-blue-500 hover:underline cursor-pointer  mr-2">{activity.activity.title}</a>{activity.activity.body}{activity.isResolve.flag ? <span className='badge bg-green-400 text-black ml-2'>Resolved</span>: <span className='badge bg-red-400 text-black ml-2'>UnResolved</span>}</div>
        </div>
      </div>
    </li>
  )
}

export default ResolveBug