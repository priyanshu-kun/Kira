import React from 'react'

function Pagination({ handleSetPagination, pagination, documentCount, totalPages, page }) {
    return (
        <div className="flex flex-col items-center relative z-[10] mt-12">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{pagination.skip}</span> to <span className="font-semibold text-gray-900 dark:text-white">{pagination.skip + pagination.limit >= documentCount ? documentCount : pagination.skip + pagination.limit}</span> of <span className="font-semibold text-gray-900 dark:text-white">{documentCount}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0 border-2px border-solid border-white/10 rounded-xl overflow-hidden">
                {
                    page === 1 ? (

                        <button className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white   pointer-events-none cursor-not-allowed  bg-[#272727] opacity-60`}>
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Prev
                        </button>
                    ) : (

                        <button onClick={() => {
                            handleSetPagination(true)
                        }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#121212]">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Prev
                        </button>
                    )
                }
                {
                    page === totalPages ? (

                        <button className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white   pointer-events-none cursor-not-allowed  bg-[#272727] border-0 border-l border-white/30 opacity-60`}>
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    ) : (

                        <button onClick={() => {
                            handleSetPagination(false)
                        }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#121212] border-0 border-l border-white/30 ">
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Pagination