import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchBugsFromProject, resolveBug, updateBug } from '../../http'
import Preloader from './Preloader'
import Navbar from "./Navbar"
import { FiArrowLeft, FiTrash, FiXCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { FaCheck, FaLink, FaTimes, FaTrash } from 'react-icons/fa'
import copy from 'copy-to-clipboard'


function BugDetails() {
  const { projectId, id } = useParams()
  const [bugDetails, setBugDetails] = useState({})
  const [loader, setLoader] = useState(true)
  const { user } = useSelector(state => state.user)
  const [image, setImage] = useState({ img: "", width: 0, height: 0 })
  const [description, setDescription] = useState("")
  const [fullView, setFullView] = useState(false)
  const [copyLink, setCopyLink] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    (async () => {
      try {
        const { data: { data: details } } = await fetchBugsFromProject(id)
        if(!details) {
          navigate("/")
          return toast.error("Bug is already deleted by user", {
            icon: "😓"
          })
        }
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


  async function handleCopyLine(e) {
    if (copyLink === true) return;
    const link = `http://localhost:5173/bug/${projectId}/${id}`;
    copy(link)
    setCopyLink(true)
    return toast.success("Link is copied to clipboard", {
      icon: "💥"
    })
  }


  async function handleUpdateChange(e) {
    if (!user) {
      return toast.success("Please login first", {
        icon: "💥"
      })
    }
    try {
      let payload = {};
      if (image.img !== "") {
        payload = {
          ...payload,
          Attachment: image,
        }
      }
      if (description !== "") {
        payload = {
          ...payload,
          Description: description
        }
      }
      const { data: { data: bug } } = await updateBug(id, payload)
      console.log(bug)
      setBugDetails(bug)
      return toast.success("Updated Successfully.", {
        icon: "💥"
      })
    }
    catch (e) {
      return toast.error("Cannot able to update details.", {
        icon: "😓"
      })
    }
  }



  async function handleRemoveAttachment() {
    if (!user) {
      return toast.success("Please login first", {
        icon: "💥"
      })
    }
    try {
      let payload = { Attachment: { img: "", width: 0, height: 0 } };
      const { data: { data: bug } } = await updateBug(id, payload)
      setBugDetails(bug)
    }
    catch (e) {
      return toast.error("Cannot able to update details.", {
        icon: "😓"
      })
    }
  }


  async function handleResolve() {
    if (!user) {
      return;
    }
    try {
      const { data: { data: bug } } = await resolveBug(id);
      setBugDetails(bug)
      return toast.success("Bug resolved.", {
        icon: "💥"
      })
    }
    catch (e) {
      return toast.error("Something bad happen.", {
        icon: "😓"
      })
    }
  }


  return (
    <>
      <Navbar />
      <div className=' min-h-[100vh] w-full bg-black pb-16'>
        <div className='dashboard-right-body text-[#ffffff] pt-36 relative'>
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
                          {
                            !bugDetails.isResolve ? (
                              <button onClick={handleResolve} className='btn bg-green-400 hover:bg-green-500 text-black w-24 normal-case mr-6'>Resolve</button>
                            ) : (
                              <p className='bg-red-400 rounded-xl flex items-center justify-center h-14  text-white w-32 normal-case mr-6'>Resolved<FaTimes className='text-white ml-1 text-lg' /></p>
                            )
                          }
                        </>
                      )
                    }

                    <span className='p-2 rounded-lg bg-[#121212] border border-solid border-white/10 cursor-pointer' onClick={(e) => {
                      handleCopyLine(e)
                    }}>{copyLink ? <FaCheck className=' text-green-400' /> : <FaLink className=' hover:text-green-400' />}</span>
                  </div>
                  <h1 className='my-12 text-4xl ml-2'>{bugDetails.Name}</h1>
                  <h1 className='text-lg mb-1 profile ml-2'>Description</h1>
                  {
                    bugDetails.Description !== "" ? (
                      <p className=' w-[80%] max-w-[800px] text-lg opacity-80 ml-2'>{bugDetails.Description}</p>
                    ) : (
                      <>
                        <textarea name='Description' value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered mt-2 bg-black w-3/4 h-28 border-2px border-solid border-white/10  text-base" placeholder="Add description"></textarea>
                        <button onClick={handleUpdateChange} className='btn hover:bg-green-500 bg-green-400 w-20 text-white mt-4'>Update</button>
                      </>
                    )
                  }
                  <div className='mt-12'>
                    <h1 className='profile text-xl ml-2' >Attachment</h1>
                    {
                      bugDetails.Attachment.img !== "" ? (
                        <div className='w-[200px] h-[200px] mt-4 rounded-2xl border-2px relative border-solid border-white/10 cursor-pointer'>
                          <img onClick={() => setFullView(true)} className='object-cover w-full h-full rounded-2xl' src={bugDetails.Attachment.img} alt="" />
                          <span onClick={handleRemoveAttachment} className='absolute  top-2 right-2 rounded-lg cursor-pointer p-2 bg-white'><FaTrash className='text-lg text-red-400' /></span>
                        </div>
                      ) : (
                        image.img !== "" ? (
                          <>
                            <div className='relative  w-fit'>
                              <img onClick={() => setFullView(true)} src={image.img} alt="upload image" className='w-[500px] mt-2 h-[300px] object-cover relative rounded-lg cursor-pointer' />
                              <span onClick={(e) => setImage({ img: "", width: "", height: "" })} className='absolute  top-2 right-2 rounded-full cursor-pointer bg-black'><FiXCircle className='text-3xl text-white' /></span>
                              <button onClick={handleUpdateChange} className='btn hover:bg-green-500 bg-green-400 w-20 text-white mt-2'>Update</button>
                            </div>
                          </>
                        ) : (
                          <>
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
                          </>
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
        fullView && <div className='w-[100vw] h-[100vh] fixed flex items-center justify-center top-0 right-0 bg-black/80 z-[99999] overflow-hidden'>
          <div className={`w-[${image.img === "" ? bugDetails.Attachment.width : image.width}] h-[${image.img === "" ? bugDetails.Attachment.height : image.height}]  ${bugDetails.Attachment.height > bugDetails.Attachment.width ? "max-w-[40%]": "max-w-[80%]" }  overflow-auto rounded-2xl  border-[3px] border-solid border-white/30`}>
            <img className="rounded-2xl  w-full h-auto " src={image.img === "" ? bugDetails.Attachment.img : image.img} alt="" />
          </div>
          <span onClick={(e) => setFullView(false)} className='absolute  top-2 right-2 rounded-full cursor-pointer bg-black'><FiXCircle className='text-3xl text-white' /></span>
        </div>
      }
    </>
  )
}

export default BugDetails