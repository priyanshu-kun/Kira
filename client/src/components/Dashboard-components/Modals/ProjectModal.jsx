import React,{useState} from 'react'

const initialState = {
    title: "",
    tags: []
}

function ProjectModal() {

    const [projectState,setProjectState] = useState(initialState)

    const handleProjectState = (e) => {
        setProjectState(prev => {
            return {
                ...prev,
                [e.target.name]: [e.target.value]
            }
        })
    }


    const handleProjectSubmit = (e) => {
        e.preventDefault();

    }


    return (
        <>
            < input type="checkbox" id="create-project" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box bg-black py-12 border-2px border-solid border-white/10">
                    <h3 className="font-bold text-xl">👀 Add project details</h3>
                    <p className="py-1 font-bold opacity-60">You can change these details anytime in your project settings.</p>
                    <form action="" className="mb-14 mt-3">
                        <div className="form-control mb-2 w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter project title!</span>
                            </label>
                            <input type="text" value={projectState.title} onChange={handleProjectState} placeholder="eg. my cool project" className="input text-base py-2 input-bordered bg-black w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter project tags seprated by comma!</span>
                            </label>
                            <input type="text" value={projectState.tags} onChange={handleProjectState} placeholder="eg. reactjs,nodejs,cpp" className="input text-base py-2 input-bordered bg-black w-full max-w-xs" />
                        </div>
                    </form>
                    <div className="modal-action flex justify-around">
                        <label onClick={() => setProjectState(initialState)} htmlFor="create-project" className="pushable normal-case bg-red-600 rounded-full">
                            <span className="front rounded-full w-36 bg-red-400 py-3 flex items-center justify-center">
                                Cancel
                            </span>
                        </label >
                        < label onClick={handleProjectSubmit} htmlFor="create-project" className="pushable normal-case bg-green-600 rounded-full">
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