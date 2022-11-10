import React from 'react'

function Dashboard() {
  return (
    <div className='h-[calc(100vh-4rem)] mt-16 w-full'>
        <div className='dashboard-right-header  flex px-36 pt-10 items-center justify-between'>
          <h1 className='dashboard-right-header-title text-white text-2xl relative'>Projects</h1>
          <button className="pushable normal-case bg-green-600 rounded-full">
            <span className="front rounded-full w-36 bg-green-400 py-3">
              Create
            </span>
          </button>
        </div>
        <div className='dashboard-right-body text-white mt-12'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque iusto dolorum laudantium dignissimos beatae hic sit asperiores harum illum repellat dolores aut maiores, animi, totam quibusdam quis itaque vel amet!
        </div>
    </div>
  )
}

export default Dashboard