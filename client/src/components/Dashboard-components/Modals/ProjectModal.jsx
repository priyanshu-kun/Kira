import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { createNewProject } from '../../../http'
import {useDispatch, useSelector} from "react-redux"
import { setProjectDetails } from '../../../store/project.slice'


const initialState = {
    title: "",
    tags: ""
}

function ProjectModal({fetchingProjectFlag,setFetchingProjectFlag}) {

    const [projectState,setProjectState] = useState(initialState)
    const {user: {username, id}} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleProjectState = (e) => {
        setProjectState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const convertStringIntoArray = (str) => {
        return  str.split(",").map(s => s.trim());
    }


    const handleProjectSubmit = async (e) => {
        if(!projectState.tags || !projectState.title) {
            return toast.error("All fields are required.", {
                icon: "😓"
            })
        }
        const topicArray = convertStringIntoArray(projectState.tags) 
        const dataForServer = {
            ...projectState,
            tags: topicArray,
            owner: id,
            projectLead: username 
        }
        try {
            const {data: {reqStatus,data}} = await createNewProject(dataForServer)
            if(reqStatus) {
                dispatch(setProjectDetails(data));
            }
            setFetchingProjectFlag(!fetchingProjectFlag)
            setProjectState(initialState)
            return toast.success(`*${projectState.title}* - has been created.`, {
                icon: "👏"
            })
        }
        catch(e) {
            return toast.error("Something bad happen.", {
                icon: "😓"
            })
        }
    }


    return (
        <>
            < input type="checkbox" id="create-project" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box bg-black py-12 border-2px border-solid border-white/10">
                    <h3 className="font-bold text-xl text-white">👀 Add project details</h3>
                    <p className="py-1 font-bold opacity-60 text-white">You can change these details anytime in your project settings.</p>
                    <form action="" className="mb-14 mt-3">
                        <div className="form-control mb-2 w-full max-w-xs">
                            <label className="label">
                                <span className="label-text opacity-60">Enter project title!</span>
                            </label>
                            <input type="text" name='title' value={projectState.title} onChange={handleProjectState} placeholder="eg. my cool project" className="input text-base py-2 input-bordered bg-black w-full max-w-xs text-white" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text opacity-60">Enter project tags seprated by comma!</span>
                            </label>
                            <input type="text" name='tags' value={projectState.tags} onChange={handleProjectState} placeholder="eg. reactjs,nodejs,cpp" className="input text-base py-2 input-bordered bg-black w-full max-w-xs text-white" />
                        </div>
                    </form>
                    <div className="modal-action flex justify-around">
                        <label onClick={() => setProjectState(initialState)} htmlFor="create-project" className="pushable normal-case bg-red-600 rounded-full">
                            <span className="front rounded-full w-36 bg-red-400 py-3 flex items-center justify-center">
                                Cancel
                            </span>
                        </label >
                        < label  onClick={handleProjectSubmit} htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
                            <span className="front rounded-full w-36 bg-green-400 py-3 flex items-center justify-center">
                                Submit
                            </span>
                        </label >
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectModal