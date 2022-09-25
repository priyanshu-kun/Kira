import React, { useRef, useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import ContentEditable from "react-contenteditable"
import avatar from "../../assets/avatar.jpg"
import "./SignUp.css"
import { Link } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import {setAuth} from "../../store/auth.slice"

// import pointingArrow from "../../assets/arrow.svg"
const initialState = {
  fullName: "",
  email: "",
  password: ""
}

function SignUp() {


  const dipatch = useDispatch()

  const text = useRef("Username")
  const [inputs, setInputs] = useState(initialState)
  const [image, setImage] = useState(avatar)
  const [showHide,setShowHide] = useState(false)



  const handleChange = evt => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
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
    reader.onloadend = function() {
      setImage(reader.result)
    }
  }


  const handleSubmit = e => {
    e.preventDefault()
    const formContent = {
      ...inputs,
      username: text.current,
      image
    }
    dipatch(setAuth(formContent))
  }


  return (
    <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
      <div className='auth-header flex w-3/4 mx-auto justify-between py-6 fixed top-0 left-1/2 transform -translate-x-1/2'>
        <div className=' flex flex-col'>
          <h1 className='logo text-xl'>Kira </h1>
          <span className='logo-data flex items-center mt-5 text-base opacity-60'><span className='mr-2'>priyanshusharma.me</span> <FiArrowRight /></span>
        </div>
        <Link to="/SignIn" class="btn btn-active btn-ghost normal-case tex-sm text-black/60">Sign In</Link>
      </div>
      <img className='register-character-image absolute bottom-10 right-20' src={character} alt="" />
      <div className='form-body px-12 py-12 bg-white w-form-width relative z-50 rounded-3xl shadow-sm'>
        <h1 className='signup__form__welcome text-center text-2xl mb-10'>Agent Register</h1>
        {/* <p className='text-center pt-6 pb-10 w-72 mx-auto'>Hey, Enter your details to get to Sign up to your account.</p> */}
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
                <button className="btn btn-ghost btn-active rounded-full  border-none text-black hover:border-none px-8 normal-case">Remove</button>
              </div>
              <div className='username-field text-lg opacity-60 relative flex'><span className='text-button-main-light mr-1'>@</span><ContentEditable html={text.current} onBlur={handleBlur} onChange={handleChange} /></div>
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
                    }} className='text-gray-600 cursor-pointer absolute right-6 h-12 flex items-center justify-center bottom-0'>{showHide ? "Show" : "Hide"}</span>
                  </div>
                  <button class="btn btn-primary w-56 mt-8 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Sign up</button>
                </div>
                <div class="divider my-8">or Sign up with</div>
                <div class=" flex w-full text-center justify-center">
                  <button className="btn mr-3 normal-case rounded-xl bg-transparent border-1 border-solid border-black/10 text-black hover:bg-transparent"><FaGoogle className='mr-2 text-xl' /> Google</button>
                  <button className="btn normal-case rounded-xl bg-transparent border-1  border-solid border-black/10 text-black hover:bg-transparent"><FaGithub className='mr-2 text-xl' /> Github</button>
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