import React from 'react'

function Home() {
  return (
    <div className='bg-white min-h-screen max-h-screen text-black'>
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content ml-96 mt-10">
          <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home