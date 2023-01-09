import React, { useState } from 'react'
import {  FaUserSecret } from "react-icons/fa";
import character from "../../assets/character.svg"
import "./SignUp.css"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setOTPData } from "../../store/auth.slice"
import { sendOTP, userLogin } from "../../http/index"
import Navbar from '../../components/Navbar';
import avatar from "../../assets/avatar.png"
import { toast } from 'react-toastify';
import { setUser } from '../../store/user.slice';
const initialState = {
  username: "",
  fullName: "",
  email: "",
  password: ""
}

function SignUp() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState(initialState)
  const [image, setImage] = useState(avatar)
  const [showHide, setShowHide] = useState(false)
  const [queryParams] = useSearchParams();



  const handleChange = e => {
    if (e.keyCode === 13) return;
    setInputs(prev => {
      return {
        ...prev,
        username: e.target.value
      }
    })
  };


  const handleInputChanges = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }



  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setImage(reader.result)
    }
  }

  const handleRemoveAvatar = (e) => {
    e.preventDefault();
    setImage(avatar)
  }



  const handleSubmit = async e => {
    e.preventDefault()
    const formContent = {
      ...inputs,
      image
    }
    if (!inputs.username || image === avatar || !inputs.email || !inputs.fullName || !inputs.password) {
      return toast.error("All fields are required.", {
        icon: "😓"
      })
    }
    try {
      const { data: { data } } = await sendOTP({ Email: formContent.email })
      dispatch(setAuth(formContent))
      dispatch(setOTPData(data));
      const queryData = queryParams.get("data");
      navigate(`/confirm-otp${queryData != null ? "?data=" + queryData : ""}`)
      toast.success("OTP has been sent.", {
        icon: "🎉"
      })
    }
    catch (e) {
      toast.error(e.response.data.data, {
        icon: "😰"
      })
    }
  }



  async function handleGuestLogin(e) {
    e.preventDefault()
    try {
      const payload = {
        emailAndUsername: "Guest",
        password: "Guest"
      }
      const { data } = await userLogin(payload);
      if (data.reqStatus) {
        const User = {
          auth: data.data.auth,
          user: data.data.userDto
        }
        dispatch(setUser(User))
        navigate('/')
      }
      toast.success("You are logged in as a guest.", {
        icon: "🎉"
      })
    }
    catch (e) {
      toast.error(e.response.data.data, {
        icon: "😰"
      })
    }
  }


  return (
    <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
      <Navbar _Route={"SignIn"} />
      <img className='register-character-image absolute bottom-10 right-20' src={character} alt="" />
      <div className='form-body px-12 py-12 bg-white w-form-width relative z-50 rounded-3xl shadow-sm'>
        <h1 className='signup__form__welcome text-center text-2xl mb-10'>Agent Register</h1>
        <form className='w-full h-full' onSubmit={handleSubmit} action="">
          <div class="flex w-full">
            <div class="flex flex-col items-center justify-center  card bg-transparent rounded-box px-6">
              <div class="avatar mb-8">
                <div class="avatar-cover w-28 overflow-hidden rounded-3xl">
                  <img className='object-cover' src={image} />
                </div>
              </div>
              <div className='avatar-buttons mb-16'>
                <label className='btn  btn-primary rounded-full bg-button-main-light border-none text-black hover:bg-button-main-light px-8 mr-4 normal-case' >
                  <input type="file" onChange={captureImage} accept="image/png, image/jpg, image/gif, image/jpeg" className='custom-file-input hidden' />
                  Select
                </label>
                <button onClick={handleRemoveAvatar} className="btn btn-ghost btn-active rounded-full  border-none text-black hover:border-none px-8 normal-case">Remove</button>
              </div>
              <div className='username-field text-lg opacity-60 relative flex'><span className='text-accent-color mr-1'>
                @
              </span>
                <input className=' outline-none w-36 block' onChange={handleChange} value={inputs.username} type="text" placeholder='Username' />
              </div>
            </div>
            <div class="divider divider-horizontal">AND</div>
            <div class="grid flex-grow card bg-transparent rounded-box place-items-center">

              <div class="flex flex-col w-full border-opacity-50">
                <div class="grid card rounded-box place-items-center">
                  <div class="form-control w-full max-w-register-form-field mb-2">
                    <label class="label">
                      <span class="label-text">What is your full name?</span>
                    </label>
                    <input type="text" name='fullName' value={inputs.fullName} onChange={handleInputChanges} placeholder="eg. jhon doe" class="bg-secondary-light input input-bordered w-full max-w-register-form-field" />
                  </div>
                  <div class="form-control w-full max-w-register-form-field mb-2">
                    <label class="label">
                      <span class="label-text">What is your email?</span>
                    </label>
                    <input type="email" name='email' value={inputs.email} onChange={handleInputChanges} placeholder="eg. jhon@domain.com" class="bg-secondary-light input input-bordered w-full max-w-register-form-field" />
                  </div>
                  <div class="form-control w-full max-w-register-form-field mb-2 relative select-none">
                    <label class="label">
                      <span class="label-text">What is your password?</span>
                    </label>
                    <input type={showHide ? "text" : "password"} name='password' value={inputs.password} onChange={handleInputChanges} placeholder="eg. stay strong" class="bg-secondary-light select-none input input-bordered w-full max-w-register-form-field relative" />
                    <span onClick={(e) => {
                      setShowHide(prev => !prev);
                    }} className='text-gray-600 cursor-pointer absolute right-6 h-12 flex items-center justify-center bottom-0'>{!showHide ? "Show" : "Hide"}</span>
                  </div>
                  <button className="pushable normal-case mt-8  rounded-full">
                    <span className="front rounded-full w-56 py-3">
                      Sign up
                    </span>
                  </button>
                </div>
                <div class="divider my-8">Alternatively, you may give a guest visit.</div>
                <div class=" flex w-full text-center justify-center">
                  <button onClick={handleGuestLogin} className="btn mr-3 normal-case rounded-xl bg-transparent border-1 border-solid border-black/10 text-black hover:bg-transparent"><FaUserSecret className='mr-2' />Guest Visit</button>
                </div>
              </div>
              <p className='text-sm text-center mt-6'><span className='text-gray-500 mr-2'>Already have an account?</span>
                <Link className='cursor-pointer' to="/SignIn">Sign in now</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp



/**
 * 
 */