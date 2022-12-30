import React, { useState } from 'react'
import { FiXCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { createNewBug } from '../../../http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { isFulfilled } from '@reduxjs/toolkit'

const initialState = {
    Name: "",
    Type: "Bug",
    Description: "",
    Priority: "Low",
    Severity: "Minor",
    ReporterName: "",
    ProjectName: "",
    AssignedTo: ""
}

const initialProfileState = {
    Platform: "",
    OS: "",
    Version: ""
}

function IssueModal() {



    const [issueForm, setIssueForm] = useState(initialState)
    const [profile, setProfile] = useState(initialProfileState)
    const [image, setImage] = useState({img: "",width: 0,height: 0})
    const projectDetails = useSelector(state => state.projects)
    const { user: { id, username } } = useSelector(state => state.user)
    const navigate = useNavigate();
    const [users,setUsers] = useState([])


    function handleSuggetions(value) {
/// first fetch all users then handle suggetions        
    }


    function handleIssueChange(e) {
        if(e.target.name === "AssignedTo") {
            handleSuggetions(e.target.value)
        }
        setIssueForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleIssueProfileChange(e) {
        setProfile(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    async function handleNewIssueSubmit(e) {
        const payloadToServer = {
            ...issueForm,
            Profile: profile,
            Attachment: image,
            ReporterName: username,
            ProjectName: projectDetails.details.title,
            ProjectId: projectDetails.details._id,
            Reporter: id
        }
        if (issueForm.Name.length > 50) {
            return toast.error("Bug Name must be less than 50 characters long.", {
                icon: "😓"
            })
        }
        if (payloadToServer.Name === "" || payloadToServer.Priority === "" || payloadToServer.ProjectName === ""
            || payloadToServer.ReporterName === "" || payloadToServer.Severity === "" || payloadToServer.Type === "" || payloadToServer.ProjectId === "" || payloadToServer.Reporter === ""
        ) {
            return toast.error("All fields are required.", {
                icon: "😓"
            })
        }
        try {
            const { data: { data: { _id } } } = await createNewBug(payloadToServer)
            setIssueForm(initialState)
            setImage("")
            setProfile(initialProfileState)
            navigate("/bug/" + projectDetails.details._id + "/" + _id)
        }
        catch (e) {
            return toast.error("Cannot able to create new issue.", {
                icon: "😓"
            })
        }
    }


    const captureImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            const image = new Image();
            image.src = reader.result;
            image.onload = function () {
              setImage({
                img: reader.result,
                width: image.naturalWidth,
                height: image.naturalHeight,
              });
            };
        }
    }


    return (
        <>
            <input type="checkbox" id="create-issue" className="modal-toggle" />
            <div className="modal cursor-pointer modal-bottom sm:modal-middle  ">
                <div className="modal-box bg-black py-12 border-2px border-solid border-white/10 h-issue-form-height w-issue-form-width">
                    <div>
                        <h3 className="font-bold text-xl text-white">Create Issue</h3>
                        <p className="py-1 font-bold  text-red-300">You cannot change those details after they have been set. Except the fields that are don't required</p>
                    </div>
                    <form className='w-full  mt-6'>
                        <label htmlFor="projectName" >
                            <span className=' ml-2'><span className='opacity-60'>Project Name</span> <span className='text-red-400'>*</span></span>
                            <input value="Something Cool" type="text" id='projectname' placeholder="Name" className="input-fields input mt-2 input-bordered w-full max-w-xs bg-black border-2px border-solid border-white/10 h-14" disabled />
                        </label>
                        <label htmlFor="reporterName" className='mt-4 block'>
                            <span className=' ml-2'><span className='opacity-60'>Reporter Name</span> <span className='text-red-400'>*</span></span>
                            <input value="Tadano_Kun" type="text" id='reportername' placeholder="Name" className="input-fields input mt-2 input-bordered w-full max-w-xs bg-black border-2px border-solid border-white/10 h-14" disabled />
                        </label>
                        <label htmlFor="name" className='mt-4 block'>
                            <span className='ml-2'><span className='opacity-60'>Issue Name</span> <span className='text-red-400'>*</span></span>
                            <input type="text" name='Name' onChange={handleIssueChange} value={issueForm.Name} id='name' placeholder="Name" className="input mt-2 input-bordered w-full max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                        </label>
                        <label htmlFor="type" className='mt-4 block'>
                            <span className='ml-2'><span className='opacity-60'>Issue Type</span> <span className='text-red-400'>*</span></span>
                            <select name='Type' onChange={handleIssueChange} className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 " defaultValue={issueForm.Type}>
                                <option value="Bug" >Bug</option>
                                <option value="New Feature">New Feature</option>
                                <option value="Improvement">Improvement</option>
                                <option value="Task">Task</option>
                                <option value="Epic">Epic</option>
                            </select>
                        </label>
                        <label htmlFor="Description" className='mt-4 block'>
                            <span className='ml-2'><span className='opacity-60'>Issue Description</span></span>
                            <textarea name='Description' value={issueForm.Description} onChange={handleIssueChange} className="textarea textarea-bordered mt-2 bg-black w-full h-28 border-2px border-solid border-white/10  text-base" placeholder="Add description"></textarea>
                        </label>
                        <label htmlFor="priority" className='mt-4 block'>
                            <span className='ml-2'><span className='opacity-60'>Issue Priority</span> <span className='text-red-400'>*</span></span>
                            <select name='Priority' onChange={handleIssueChange} className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 " defaultValue={issueForm.Type}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Immediate">Immediate</option>
                            </select>
                        </label>
                        <label htmlFor="Attachment" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>Attachment</span>
                            <label htmlFor='file-upload' className='bg-white/5 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-400 focus-within:ring-offset-2 cursor-pointer block border-2px border-solid border-white/10 rounded-xl mt-2'>
                                <div className="mt-1 flex justify-center relative rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    {
                                        image.img !== "" ? (
                                            <>
                                                <img src={image.img} alt="upload image" className='rounded-lg' />
                                                <span onClick={(e) => setImage("")} className='absolute  top-2 right-2 rounded-full cursor-pointer bg-black'><FiXCircle className='text-3xl text-white' /></span>
                                            </>
                                        ) : (

                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer rounded-md bg-transparent font-medium text-green-300  font-black underline  hover:text-green-300">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" onChange={captureImage} name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </label>
                        </label>
                        <label htmlFor="severity" className='mt-4 block'>
                            <span className='ml-2'><span className='opacity-60'>Issue Severity</span> <span className='text-red-400'>*</span></span>
                            <select name='Severity' defaultValue={issueForm.Severity} onChange={handleIssueChange} className="select select-bordered bg-black h-14 w-full max-w-xs mt-2 border-2px border-solid border-white/10 ">
                                <option value="Minor">Minor</option>
                                <option value="Major">Major</option>
                                <option value="Critical">Critical</option>
                                <option value="Crash">Crash</option>
                                <option value="Tweak">Tweak</option>
                            </select>
                        </label>
                        <label htmlFor="profile" className='mt-4 block'>
                            <span className='opacity-60 ml-2'>System Profile</span>
                            <div className="collapse collapse-arrow mt-2 bg-black border-2px border-solid border-white/10 rounded-xl">
                                <input type="checkbox" />
                                <div className="collapse-title text-base font-black">
                                    Enter your system profile
                                </div>
                                <div className="collapse-content mt-4">
                                    <div className='flex items-center mb-2 justify-between'>
                                        <span className='mr-4'>Platform</span>
                                        <input name='Platform' value={profile.Platform} onChange={handleIssueProfileChange} type="text" id='platform' placeholder="eg. Linux/Windows/Mac" className="input w-80 input-bordered  max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                                    </div>
                                    <div className='flex items-center mb-2 justify-between'>
                                        <span className='mr-4'>OS</span>
                                        <input name='OS' type="text" value={profile.OS} onChange={handleIssueProfileChange} id='os' placeholder="eg. Ubuntu/Mint" className="input input-bordered w-80 max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                                    </div>
                                    <div className='flex items-center mb-2 justify-between'>
                                        <span className='mr-4'>Version</span>
                                        <input name='Version' type="text" value={profile.Version} onChange={handleIssueProfileChange} id='version' placeholder="eg. 1.0.0" className="input input-bordered w-80 max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                                    </div>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="assigned" className='mt-4 block' >
                            <span className='opacity-60 ml-2'>Assigned to user</span>
                            <input type="text" name='AssignedTo' value={issueForm.AssignedTo} onChange={handleIssueChange} id='projectname' placeholder="Username" className="input  mt-2 input-bordered w-full max-w-xs bg-black border-2px border-solid border-white/10 h-14" />
                        </label>
                        <div className="modal-action flex justify-around mt-12">
                            <label onClick={(e) => console.log(e)} htmlFor="create-issue" className="pushable normal-case bg-red-600 rounded-full">
                                <span className="front rounded-full w-36 bg-red-400 py-3 flex items-center justify-center">
                                    Cancel
                                </span>
                            </label >
                            < label onClick={(e) => handleNewIssueSubmit(e)} htmlFor="create-issue" className="pushable normal-case bg-green-600 rounded-full">
                                <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
                                    Submit
                                </span>
                            </label >
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default IssueModal   