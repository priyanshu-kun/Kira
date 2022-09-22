import React, { useRef, useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import ContentEditable from "react-contenteditable"
import avatar from "../../assets/avatar.jpg"
import "./SignIn.css"
import { Link } from "react-router-dom"

// import pointingArrow from "../../assets/arrow.svg"
const initialState = {
  emailAndUsername: "",
  password: ""
}

function SignUp() {

  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState(initialState)





  const handleInputChanges = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  const handleSubmit = e => {
    e.preventDefault()
  }


  return (
    <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
      <div className='auth-header flex w-3/4 mx-auto justify-between py-6 fixed top-0 left-1/2 transform -translate-x-1/2'>
        <div className=' flex flex-col'>
          <h1 className='logo text-xl'>Kira </h1>
          <span className='logo-data flex items-center mt-5 text-base opacity-60'><span className='mr-2'>priyanshusharma.me</span> <FiArrowRight /></span>
        </div>
        <button class="btn btn-active btn-ghost normal-case tex-sm text-black/60">Sign Up</button>
      </div>
      <img className='login-character-image absolute bottom-10 right-20' src={character} alt="" />
      <div className='form-body px-12 py-12 bg-white  w-form-width-login  relative z-50 rounded-3xl shadow-sm'>
        <h1 className='signup__form__welcome text-center text-2xl'>Agent Login</h1>
        <p className='text-center py-6 w-72 mx-auto '>Hey, Enter your details to get to Sign in to your account.</p>
        <form className='w-full h-full' onSubmit={handleSubmit} action="">
          <div class="flex flex-col w-full border-opacity-50">
            <div class="grid card rounded-box place-items-center">
              <div class="form-control w-full max-w-full mb-2">
                <label class="label">
                  <span class="label-text">Enter email or username</span>
                </label>
                <input type="email" name='email' value={inputs.emailAndUsername} onChange={handleInputChanges} placeholder="Email / Username" class="bg-secondary-light input input-bordered w-full max-w-full" />
              </div>
              <div class="form-control w-full max-w-full mb-2">
                <label class="label">
                  <span class="label-text">What is your password?</span>
                </label>
                <input type="password" name='password' value={inputs.password} onChange={handleInputChanges} placeholder="eg. stay strong" class="bg-secondary-light input input-bordered w-full max-w-full" />
              </div>
              <div className="flex w-full justify-between items-center mb-6">
                <div className='checkbox-wrapper'>
                  <label class="cursor-pointer label">
                    <input type="checkbox" className={isChecked ? "checked" : ""} checked={isChecked} onClick={(e) => setIsChecked(prev => !prev)} />
                    <span class="label-text">Remember me</span>
                  </label>
                </div>
                <label class="label">
                  <a href="#" class="label-text-alt link text-sm  link-hover">Having trouble in sign in?</a>
                </label>
              </div>
              <button class="btn btn-primary w-56 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Sign in</button>
            </div>
            <div class="divider my-8">or Sign in with</div>
            <div class=" flex w-full text-center justify-center">
              <button className="btn mr-3 normal-case rounded-box bg-transparent border-2 border-solid border-black/10 text-black hover:bg-transparent"><FaGoogle className='mr-2 text-xl' /> Google</button>
              <button className="btn normal-case rounded-box bg-transparent border-2  border-solid border-black/10 text-black hover:bg-transparent"><FaGithub className='mr-2 text-xl' /> Github</button>
            </div>
          </div>
          <p className='text-sm text-center mt-6'><span className='text-gray-500 mr-2'>Don't have an account?</span>
            <Link className='cursor-pointer' to="/SignUp">Request now</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp

