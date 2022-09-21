import React, { useRef,useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import ContentEditable from "react-contenteditable"
import "./SignUp.css"

// import pointingArrow from "../../assets/arrow.svg"

function SignUp() {

  const text = useRef("Username")
  const [isChecked, setIsChecked] = useState(true);


  const handleChange = evt => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };


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
      <div className='form-body px-12 py-12 bg-white w-form-width relative z-50 rounded-3xl shadow-sm'>
        {/* <h1 className='signup__form__welcome text-center text-3xl pb-12'>Welcome 🔮</h1> */}
        {/* <p className='text-center pt-3 pb-12 opacity-60'>Hey, Enter your details to get to Sign up to your account.</p> */}
        <form className='w-full h-full' action="">
          <div class="flex w-full">
            <div class="flex flex-col items-center justify-center  card bg-transparent rounded-box px-6">
              <div class="avatar mb-8">
                <div class="avatar-cover w-32 rounded-3xl">
                  <img src="https://play-lh.googleusercontent.com/icnGy-qlMfkgbD8fI0c8DMNNicVrAKm8dwXCVwgf0ljFj-KCEQftJeGbhG6QcbR-9UM" />
                </div>
              </div>
              <div className='avatar-buttons mb-16'>
                <label className='btn  btn-primary rounded-full bg-button-main-light border-none text-black hover:bg-button-main-light px-8 mr-4 normal-case' >
                  <input type="file"  accept="image/png, image/jpg, image/gif, image/jpeg" className='custom-file-input hidden'/>
                  Select
                </label>
                <button className="btn btn-ghost btn-active rounded-full  border-none text-black hover:border-none px-8 normal-case">Remove</button>
              </div>
              <div className='username-field text-lg opacity-60 relative flex'><span className='text-button-main-light mr-1'>@</span><ContentEditable html={text.current} onBlur={handleBlur} onChange={handleChange}  /></div>
            </div>
            <div class="divider divider-horizontal">AND</div>
            <div class="grid flex-grow card bg-transparent rounded-box place-items-center">

              <div class="flex flex-col w-full border-opacity-50">
                <div class="grid card rounded-box place-items-center">
                  <div class="form-control w-full max-w-xs mb-2">
                    <label class="label">
                      <span class="label-text">What is your full name?</span>
                    </label>
                    <input type="text" placeholder="eg. jhon doe" class="bg-secondary-light input input-bordered w-full max-w-xs" />
                  </div>
                  <div class="form-control w-full max-w-xs mb-2">
                    <label class="label">
                      <span class="label-text">What is your email?</span>
                    </label>
                    <input type="email" placeholder="eg. jhon@domain.com" class="bg-secondary-light input input-bordered w-full max-w-xs" />
                  </div>
                  <div class="form-control w-full max-w-xs mb-2">
                    <label class="label">
                      <span class="label-text">What is your password?</span>
                    </label>
                    <input type="password" placeholder="eg. stay strong" class="bg-secondary-light input input-bordered w-full max-w-xs" />
                  </div>
                  <div class="form-control checkbox-wrapper mb-3">
                    <label class="cursor-pointer label">
                      <input type="checkbox"  className={isChecked ? "checked" : ""} checked={isChecked} onClick={(e) => setIsChecked(prev => !prev)} />
                      <span class="label-text">Remember me</span>
                    </label>
                  </div>
                  <button class="btn btn-primary w-48 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Sign up</button>
                </div>
                <div class="divider">OR</div>
                <div class=" flex w-full text-center justify-center">
                  <button className="btn mr-3 normal-case rounded-box bg-transparent border-2 border-solid border-black/10 text-black hover:bg-transparent"><FaGoogle className='mr-2 text-xl' /> Google</button>
                  <button className="btn normal-case rounded-box bg-transparent border-2  border-solid border-black/10 text-black hover:bg-transparent"><FaGithub className='mr-2 text-xl' /> Github</button>
                </div>
              </div>
              <p className='text-sm text-center mt-6'><span className='text-gray-500 mr-2'>Don't have an account?</span>
                <a className=' cursor-pointer' hef="">Request now</a>
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