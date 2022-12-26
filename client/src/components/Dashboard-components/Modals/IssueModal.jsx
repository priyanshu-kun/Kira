import React from 'react'

function IssueModal() {
    return (
        <>
            <input type="checkbox" id="create-issue" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle  ">
                <div className="modal-box bg-black py-12 border-2px border-solid border-white/10 h-issue-form-height w-issue-form-width">
                    <div>
                        <h3 className="font-bold text-xl text-white">Create Issue</h3>
                        <p className="py-1 font-bold  text-red-300">You can change these details anytime you want.</p>
                    </div>
                    <form className=' w-full  mt-6'>
                        <label htmlFor="name">
                            <span className='opacity-60 ml-2'>Issue Name</span>
                            <input type="text" id='name' placeholder="Name" className="input input-error mt-2 input-bordered w-full max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                        </label>
                        <label htmlFor="type" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Issue Type</span>
                            <select className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 select-error">
                                <option disabled selected>Select Type</option>
                                <option>Bug</option>
                                <option>New Feature</option>
                                <option>Improvement</option>
                                <option>Task</option>
                                <option>Epic</option>
                            </select>
                        </label>
                        <label htmlFor="Description" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Issue Description</span>
                            <textarea className="textarea textarea-bordered mt-2 bg-black w-full h-28 border-2px border-solid border-white/10 textarea-error text-base" placeholder=" Description"></textarea>
                        </label>
                        <label htmlFor="type" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Issue Priority</span>
                            <select className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 select-error">
                                <option disabled selected>Select Priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                                <option>Immediate</option>
                            </select>
                        </label>
                        <label htmlFor="Description" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Attachment</span>
                            <div className='bg-white/5 border-2px border-solid border-white/10 rounded-xl mt-2'>
                                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-medium text-green-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-300 font-black underline focus-within:ring-offset-2 hover:text-green-300">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="severity" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Issue Severity</span>
                            <select className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 select-error">
                                <option disabled selected>Select Severity</option>
                                <option>Minor</option>
                                <option>Major</option>
                                <option>Critical</option>
                                <option>Crash</option>
                                <option>Tweak</option>
                            </select>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}

export default IssueModal   