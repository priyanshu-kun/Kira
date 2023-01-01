import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { FaCamera, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from 'react'
import cover from "../../assets/cover.jpg"
import { toast } from 'react-toastify'
import loaderForBtn from "../../assets/loader.gif"
import { deleteAccount, showPass, updateUser } from '../../http'
import { setUser } from '../../store/user.slice'
import ConfirmationModal from './Modals/ConfirmationModal'
import ShowPassword from './Modals/ShowPassword'


function Profile() {
  const { user: { id, username, email, fullName, avatar, Bio, Banner } } = useSelector(state => state.user)
  const initialState = {
    username,
    fullName,
    Bio: !Bio ? "" : Bio,
    Banner: ""
  }
  const [edit, setEdit] = useState(false)
  const [editProfile, setEditProfile] = useState(initialState)
  const [localBanner, setLocalBanner] = useState("")
  const [Avatar, setAvatar] = useState("")
  const [loader, setLoader] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [passwordLoader, setPasswordLoader] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordFlag, setPasswordFlag] = useState(false)
  const [resultPassword, setResultPassword] = useState("")
  const dispatch = useDispatch()


  function handleReset(e) {
    setEdit(false)
    setEditProfile(initialState)
    setLocalBanner("")
    setAvatar("")
  }


  function handleChange(e) {
    setEditProfile(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  async function handleSubmit(e) {
    e.preventDefault()
    if (localBanner === "" && Avatar === "" && editProfile.Bio === Bio && editProfile.fullName === fullName && editProfile.username === username) {
      return toast.success("Everything is upto date.", {
        icon: "🎉"
      })
    }
    try {
      const payload = {
        ...editProfile,
        Banner: localBanner,
        avatar: Avatar
      }
      setLoader(true)
      const { data } = await updateUser(id, payload)
      setLoader(false)
      if (data.reqStatus) {
        const User = {
          auth: data.data.auth,
          user: data.data.userDto
        }
        dispatch(setUser(User))
        handleReset()
      }
      else {
        throw new Error("Explicit Error")
      }
      return toast.success("Profile updated.", {
        icon: "🎉"
      })
    }
    catch (e) {
      setLoader(false)
      return toast.error("Cannot cannot able to update profile.", {
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
        if (e.target.name === "Banner") {
          setLocalBanner(reader.result)
        }
        else {
          setAvatar(reader.result)
        }
      };
    }
  }


  async function handleDeleteAccount() {
    try {
      setDeleteLoader(true)
      const { data } = await deleteAccount(id)
      if (data.reqStatus) {
        const User = {
          auth: data.data.auth,
          user: data.data.userDto
        }
        dispatch(setUser(User))
        handleReset()
      }
      else {
        throw new Error("Explicit Error")
      }
      setDeleteLoader(false)
      return toast.success("I hope we will meet someday again.", {
        icon: "🎉"
      })
    }
    catch (e) {
      setDeleteLoader(false)
      return toast.error("Internal server error.", {
        icon: "😓"
      })
    }
  }


  async function showPassword() {
    try {
      setPasswordLoader(true)
      const { data: { reqStatus } } = await showPass(id, { pass: password });
      if (reqStatus) {
        setPasswordFlag(reqStatus)
        setResultPassword(password)
      }
      else {
        return toast.success("Incorrect password.", {
          icon: "😓"
        })
      }
      setPassword("")
      setPasswordLoader(false)
    }
    catch (e) {
      setPasswordLoader(false)
      return toast.error("Internal server error.", {
        icon: "😓"
      })
    }
  }


  return (
    <>
      <div class="h-[300px] min-h-[200px] max-h-[300px] shadow-md border-b-[3px] border-solid absolute top-[64px] left-0 right-0 border-black">
        <div class="flex items-center w-full h-full">
          {
            localBanner ? (
              <img src={localBanner} alt="Profile picture" className='w-full h-full object-cover' />
            ) : (

              <img src={Banner === undefined || Banner === "" ? cover : Banner} alt="Profile picture" className='w-full h-full object-cover' />
            )
          }
        </div>

        <label htmlFor='banner' className='absolute cursor-pointer bottom-0 right-0 w-[100px] rounded-tl-xl h-[60px] bg-white/60  flex items-center justify-center border-t-2px border-l-2px border-solid border-black/30'>
          <FaCamera className='text-2xl text-black' />
          <input name='Banner' onChange={captureImage} type="file" id="banner" className='hidden' />
        </label>

      </div>
      <div className='w-[80%] min-w-[200px] flex text-white justify-between items-center mx-auto mt-[320px] relative z-[20]'>
        <div className='flex items-center'>
          <div className='w-[150px] h-[150px] relative rounded-full border-[3px] border-solid border-white overflow-hidden'>
            {
              Avatar ? (
                <img src={Avatar} alt="avatar" className='w-full h-full object-cover' />
              ) : (
                <img src={avatar} alt="avatar" className='w-full h-full object-cover' />
              )
            }
            {
              edit && (
                <label htmlFor='avatar-upload' className='absolute cursor-pointer top-[50%] w-full h-1/2 bg-white/80 flex items-center justify-center'>
                  <FaCamera className='text-2xl mb-2 text-black' />
                  <input name='Avatar' onChange={captureImage} type="file" id="avatar-upload" className='hidden' />
                </label>
              )
            }
          </div>
          <div className="mt-8 ml-6">
            <span className="font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2">@{username}</span>
            <span>({fullName})</span>
            <h2 className='text-base opacity-60'>Update your avatar and personal details here.</h2>
          </div>
        </div>
        <div className='mt-8'>
          {
            edit || localBanner !== "" ? (
              <div className='flex items-center justify-center'>
                <button onClick={handleReset} className='btn normal-case'>Cancel</button>
                <button onClick={handleSubmit} className='btn  bg-accent-color ml-4 hover:bg-accent-color text-black h-[50px] w-[100px] normal-case flex items-center justify-center'>{loader ? <img src={loaderForBtn} className="w-[40px] object-contain" alt="loader" /> : "Done"}</button>
              </div>
            ) : (
              <button onClick={() => {
                setEdit(true)
              }} className='p-2 rounded-md bg-transparent border border-solid border-white/10 flex text-center justify-center hover:bg-white/10'>
                <FaEdit className='text-xl' />
              </button>
            )
          }
        </div>
      </div>
      <div className='my-8  w-[800px] min-w-[300px] text-white ml-[200px]'>
        <h1 className="dashboard-logo w-fit font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2 mb-2">Bio</h1>
        {Bio === undefined || Bio.length === 0 ? <h1 className='text-white/60'>There is nothing to display.</h1> : (
          <p className='text-white/60'>{Bio}</p>
        )}
      </div>
      <div className="divider"></div>
      <div className='profile-section mt-14 max-w-[1000px] w-[50%] ml-[200px]  text-white'>
        <h1 className="dashboard-logo w-fit font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2 mb-16">Edit Profile</h1>
        <div className='flex justify-between mb-8  items-start'>
          <span className="font-['./assets/fonts/HelveticaNowDisplay-Black.otf'] text-lg opacity-60">Username</span>
          {
            edit ? (
              <input type="text" name="username" onChange={handleChange} value={editProfile.username} className="input  input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" />
            ) : (
              <input type="text" value={username} className="input  input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" disabled />
            )
          }
        </div>
        <div className='flex justify-between mb-8  items-start'>
          <span className="font-['./assets/fonts/HelveticaNowDisplay-Black.otf'] text-lg opacity-60">Full Name</span>
          {
            edit ? (
              <input type="text" name='fullName' onChange={handleChange} value={editProfile.fullName} className="input  input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" />
            ) : (
              <input type="text" name="fullName" value={fullName} className="input  input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" disabled />
            )
          }
        </div>
        <div className='flex justify-between mb-8 text-center items-start'>
          <span className="font-['./assets/fonts/HelveticaNowDisplay-Black.otf'] text-lg opacity-60">Email</span>
          <input type="text" value={email} className="input  input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" disabled />
        </div>
        <div className='flex justify-between mb-8 text-center items-start'>
          <span className="font-['./assets/fonts/HelveticaNowDisplay-Black.otf'] text-lg opacity-60">Password</span>
          <div className='flex items-center'>
            {
              passwordFlag ? (
                <label className='mr-4 px-4 cursor-pointer hover:bg-white/10 py-3 rounded-lg border border-solid border-white/10'><FaEyeSlash className='text-2xl' /></label>
              ) : (
                <label htmlFor="show-pass" className='mr-4 px-4 cursor-pointer hover:bg-white/10 py-3 rounded-lg border border-solid border-white/10'><FaEye className='text-2xl' /></label>
              )
            }
            <input type={`${passwordFlag ? "text" : "password"}`} value={passwordFlag ? resultPassword : "yourDuckingPassword"} className="input input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg py-6" disabled />
          </div>
        </div>
        <div className='flex justify-between mb-8 text-center items-start'>
          <span className="font-['./assets/fonts/HelveticaNowDisplay-Black.otf'] text-lg opacity-60">Bio</span>
          {
            edit ? (
              <textarea name="Bio" placeholder='Enter Bio' onChange={handleChange} type="text" value={editProfile.Bio} className="textarea input-bordered max-w-xs w-[500px] border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg min-h-[180px]" />
            ) : (
              <textarea type="text" placeholder='Enter Bio' value={Bio} className="textarea input-bordered max-w-xs w-[500px] min-h-[180px]  border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg" disabled />
            )
          }
        </div>
      </div>
      <div className='profile-section w-[100%] pl-[200px] py-20  text-white bg-red-400/10 mt-28'>
        <h1 className="dashboard-logo w-fit font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2 mb-8">Delete Account</h1>
        <p className='mb-4 opacity-60'>Please be certain before deleting your account as it cannot be undone. This process may take a while.</p>
        <label htmlFor='confirm' className='btn w-[200px] h-[40px] bg-red-400 text-black normal-case hover:bg-red-500'>Delete Account</label>
      </div>
      <footer className="footer footer-center p-4 bg-[#0a0a0a] text-white/60 border-t-2px border-solid border-white/10">
        <div>
          <p>Copyright © 2022 - All right reserved by Kira.</p>
        </div>
      </footer>
      <ConfirmationModal handleDeleteAccount={handleDeleteAccount} deleteLoader={deleteLoader} />
      <ShowPassword showPassword={showPassword} setPassword={setPassword} password={password} passwordLoader={passwordLoader} />
    </>
    // onClick={handleDeleteAccount}

  )
}

export default Profile