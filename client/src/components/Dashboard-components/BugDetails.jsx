import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchBugsFromProject } from '../../http'
import Preloader from './Preloader'
import Navbar from "./Navbar"
import { FiArrowLeft, FiXCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { FaLink } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

function BugDetails() {
  const { projectId, id } = useParams()
  const [bugDetails, setBugDetails] = useState({})
  const [loader, setLoader] = useState(true)
  const { user } = useSelector(state => state.user)
  const [image, setImage] = useState("")
  const [fullView, setFullView] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    (async () => {
      try {
        const { data: { data: details } } = await fetchBugsFromProject(id)
        setBugDetails(details)
        setLoader(false)
      }
      catch (e) {
        setLoader(false)
        return toast.error("Cannot able to fetch details.", {
          icon: "😓"
        })
      }
    })()
  }, [id])



  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setImage(reader.result)
    }
  }


  async function handleCopyLine(e) {
    const link = `http://localhost:5173/bug/${projectId}/${id}`;
    copy(link)
    return toast.success("Link is copied to clipboard", {
      icon: "💥"
    })
  }


  return (
    <>
      <Navbar />
      <div className=' min-h-[100vh] w-full bg-black'>
        <div className='dashboard-right-body text-[#ffffff] pt-36 relative '>
          {
            loader ? <Preloader /> : (
              <div className='flex w-4/5 mx-auto bug-details items-center  justify-center'>
                <div className='flex flex-col  w-[65%] bug-details-left'>
                  <div className='flex items-center'>
                    {
                      user && (
                        <>
                          <button onClick={() => {
                            navigate("/details/project/" + projectId)
                          }} className='btn mr-6 cursor-pointer bg-transparent border border-solid border-white/10 rounded-full hover:bg-transparent hover:border-transparent transition-all transform hover:-translate-x-2'><FiArrowLeft className='text-white text-3xl' /></button>
                          <button className='btn bg-green-400 hover:bg-green-500 text-white w-24 normal-case mr-6'>Done</button>
                        </>
                      )
                    }

                    <span className='p-2 rounded-lg bg-[#121212] border border-solid border-white/10 cursor-pointer' onClick={(e) => {
                      handleCopyLine(e)
                    }}><FaLink className=' hover:text-green-400' /></span>
                  </div>
                  <h1 className='my-12 text-4xl ml-2'>{bugDetails.Name}</h1>
                  <h1 className='text-lg mb-1 profile ml-2'>Description</h1>
                  {
                    bugDetails.Description !== "" ? (
                      <p className=' w-[80%] max-w-[800px] text-lg opacity-80 ml-2'>{bugDetails.Description}</p>
                    ) : (
                      <textarea name='Description' value={""} onChange={() => console.log("")} className="textarea textarea-bordered mt-2 bg-black w-3/4 h-28 border-2px border-solid border-white/10  text-base" placeholder="Add description"></textarea>
                    )
                  }
                  <div className='mt-12'>
                    <h1 className='profile text-xl ml-2' >Attachment</h1>
                    {
                      bugDetails.Attachment !== "" ? (
                        <img onClick={() => setFullView(true)} className='w-[300px] h-[300px] object-cover mt-4 rounded-2xl border-2px border-solid border-white/10 cursor-pointer' src={bugDetails.Attachment} alt="" />
                      ) : (
                        image !== "" ? (
                          <>
                            <div className='relative  w-fit'>
                              <img onClick={() => setFullView(true)} src={image} alt="upload image" className='w-[500px] mt-2 h-[300px] object-cover relative rounded-lg cursor-pointer' />
                              <span onClick={(e) => setImage("")} className='absolute  top-2 right-2 rounded-full cursor-pointer bg-black'><FiXCircle className='text-3xl text-white' /></span>
                            </div>
                          </>
                        ) : (
                          <label htmlFor='file-upload' className='bg-white/5 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-400 focus-within:ring-offset-2 cursor-pointer block border-2px border-solid border-white/10 rounded-xl mt-2  w-3/4'>
                            <div className="mt-1 flex justify-center relative rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                            </div>
                          </label>
                        )
                      )
                    }
                  </div>
                </div>
                <div className='Details-box p-6  border-2px border-solid border-white/10 bg-[#0b0b0b] rounded-xl w-[500px]'>
                  <h1 className='text-xl mb-4'>Details</h1>
                  <div className="divider"></div>
                  <div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Reporter</span>
                      <span className='text-blue-400'>@Tadano_Kun</span>
                    </div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Assigned To</span>
                      <span>Tadano_Kun</span>
                    </div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Type</span>
                      <span>Improvement</span>
                    </div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Priority</span>
                      <span>Urgent</span>
                    </div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Severity</span>
                      <span>Crash</span>
                    </div>
                    <div className='mb-6 details'>
                      <span className='mr-20 opacity-60 text-sm'>Created At</span>
                      <span>Mon 28, 2022</span>
                    </div>
                    <div className="divider"></div>
                    <div className='mb-4'>
                      <span className='profile'><span className='profile-span mr-4 opacity-60 text-base'>Platform</span>Linux</span><br />
                      <span className='profile'><span className='profile-span mr-4 opacity-60 text-base'>OS</span>Mint</span><br />
                      <span className='profile'><span className='profile-span mr-4 opacity-60 text-base'>Version</span>1.0</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {
        fullView && <div className='w-[100vw] h-[100vh] absolute flex items-center justify-center top-0 right-0 bg-black/80 z-[99999]'>
          <img className="w-[80%] rounded-2xl border-[3px] border-solid border-white/30 h-[800px] " src={image === "" ? bugDetails.Attachment : image} alt="" />
          <span onClick={(e) => setFullView(false)} className='absolute  top-2 right-2 rounded-full cursor-pointer bg-black'><FiXCircle className='text-3xl text-white' /></span>
        </div>
      }
    </>
  )
}

export default BugDetails