import React from 'react'
import { FiArrowRight } from "react-icons/fi";
import character from "../../assets/character.svg"

function SignUp() {
  return (
    <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
      <div className='auth-header flex w-3/4 mx-auto justify-between py-6 fixed top-0 left-1/2 transform -translate-x-1/2'>
        <div className=' flex flex-col'>
          <h1 className='logo text-xl'>Kira </h1>
          <span className='logo-data flex items-center mt-5 text-base opacity-60'><span className='mr-2'>priyanshusharma.me</span> <FiArrowRight /></span>
        </div>
          <button class="btn btn-active btn-ghost normal-case tex-sm text-black/60">Sign In</button>
      </div>
      <img className='login-character-image absolute bottom-10 right-20' src={character} alt="" />
      <div className='form-body px-6 py-8 bg-red-500'>
        <h1>SignUp</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatibus voluptates?</p>
        <form className='w-full h-full' action="">
          <div className='image-upload'></div>
          <div className='form-elements'>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">What is your name?</span>
                </label>
                <input type="text" placeholder="Type here" class="bg-secondary-light input input-bordered w-full max-w-xs" />
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp