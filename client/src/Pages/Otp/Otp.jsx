import React, { useRef, useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import { Link } from "react-router-dom"

function ConfirmOTP() {
    const handleSubmit = (e) => {

    }

    return (
        <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
            <div className='auth-header flex w-3/4 mx-auto justify-between py-6 fixed top-0 left-1/2 transform -translate-x-1/2'>
                <div className=' flex flex-col'>
                    <h1 className='logo text-xl'>Kira </h1>
                    <span className='logo-data flex items-center mt-5 text-base opacity-60'><span className='mr-2'>priyanshusharma.me</span> <FiArrowRight /></span>
                </div>
                <Link to="/SignUp" class="btn btn-active btn-ghost normal-case tex-sm text-black/60">Sign Up</Link>
            </div>
            <img className='login-character-image absolute bottom-10 right-20' src={character} alt="" />
            <div className='form-body px-12 py-12 bg-white  w-form-width-otp  relative z-50 rounded-3xl shadow-sm'>
                <h1 className='signup__form__welcome text-center mb-4 text-2xl'>Agent Confirm</h1>
        <p className='text-center pt-2 pb-6 opacity-80 w-72 mx-auto'>Hey, we have just sent a verification code to  <span className='text-green-400 ml-2'> jhonedoe@gmail.com</span>.</p>
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit} action="">
                    <div className="form-control w-full mb-2">
                        <label htmlFor='otp' className="label">
                            <span className="label-text">Confirm you otp</span>
                        </label>
                        <div>
                            <input type="text" id='otp' placeholder='eg. xxxxxx' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div> 
                    </div>
                    <button className="btn btn-primary w-56 mt-3 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Confirm Account</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmOTP

