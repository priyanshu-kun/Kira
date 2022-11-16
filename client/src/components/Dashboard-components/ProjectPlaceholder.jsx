import React from 'react'

function ProjectPlaceholder() {
  return (
<div className=' flex flex-col items-center justify-center mt-20'>
              <img className='opacity-30' src="https://jira-frontend-static.prod.public.atl-paas.net/assets/empty.006823bd41c59cd65bd485f104a72aeb.8.svg" alt="empty projects" />
              <h1 className='empty-project-placeholder-heading text-3xl mt-8 mb-6'>You currently have no projects
              </h1>
              <p className='text-lg opacity-80 mb-6'>
                Let's create your first project in Kira
              </p>
        < label htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
          <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
            Create
          </span>
        </label >
            </div>
  )
}

export default ProjectPlaceholder