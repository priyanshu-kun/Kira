import moment from 'moment'
import React from 'react'

function ReOpenBug({ activity }) {
  return (
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-4 justify-center items-center  bg-accent-color rounded-full ring-2 ring-accent-color w-8 h-8">
        <img className="rounded-full shadow-lg w-full h-full object-cover" src={activity.avatar} alt="Bonnie image" />
      </span>
      <div className="justify-between items-center p-4  rounded-lg border-2px border-white/10 shadow-sm sm:flex bg-[#121212]">
        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{moment(activity.time).format("MMM D, YYYY / h:mm:ss a")}</time>
        <div className='flex items-center'>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300"><a href={import.meta.env.VITE_FRONT_URL + activity.link} className="font-semibold text-blue-600 dark:text-blue-500 hover:underline cursor-pointer  mr-2">{activity.activity.title}</a>{activity.activity.body}{!activity.isResolve.flag && <span className='badge bg-red-400 text-black ml-2'>UnResolved</span>}</div>
        </div>
      </div>
    </li>
  )
}

export default ReOpenBug