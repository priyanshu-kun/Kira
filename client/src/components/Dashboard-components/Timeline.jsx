import React from 'react'

function Timeline() {
    return (
        <>

            <ol className="relative border-l-2px border-gray-200 dark:border-gray-700 mt-40 w-[80%] mx-auto">
                <li className="mb-10 ml-6">
                    <span className="flex absolute -left-4 justify-center items-center  bg-accent-color rounded-full ring-2 ring-accent-color w-8 h-8">
                        <img className="rounded-full shadow-lg w-full h-full object-cover" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?Nameauto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Bonnie image" />
                    </span>
                    <div className="justify-between items-center p-4  rounded-lg border-2px border-white/10 shadow-sm sm:flex bg-[#121212]">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Bonnie moved <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span></div>
                    </div>
                </li>
            </ol>

        </>

    )
}

export default Timeline