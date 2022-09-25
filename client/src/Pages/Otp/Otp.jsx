import React, { useRef, useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import { Link } from "react-router-dom"

function SignUp() {



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
            <div className='form-body px-12 py-12 bg-white  w-form-width-login  relative z-50 rounded-3xl shadow-sm'>
                <h1 className='signup__form__welcome text-center mb-10 text-2xl'>Agent Confirm</h1>
                <form className='w-full h-full' onSubmit={handleSubmit} action="">
                    <div class="form-control w-full max-w-full mb-2">
                        <label class="label">
                            <span class="label-text">Confirm you otp</span>
                        </label>
                        <div>
                            <input type="text" />
                        </div>
                    </div>
                    <button class="btn btn-primary w-56 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Confirm Account</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp

