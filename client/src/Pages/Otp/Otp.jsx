import React, { useRef, useState } from 'react'
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import character from "../../assets/character.svg"
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../../components/Navbar';
import {useSelector} from "react-redux"
import { verifyOTP } from '../../http';

function ConfirmOTP() {
    const authData = useSelector(state => state.auth)
    const [Otp,setOtp] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const createUser = {
            hash: authData.otp.hash,
            Email: authData.otp.Email,
            fullName: authData.user.fullName,
            username: authData.user.username,
            password: authData.user.password,
            otp: Otp
        }
        const {data} = await verifyOTP(createUser)
        console.log(data)
        navigate("/SignIn")
    }

    return (
        <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
            <Navbar _Route={"SignUp"} />
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
                            <input onChange={(e) => setOtp(e.target.value)} type="text" id='otp' placeholder='eg. xxxxxx' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div> 
                    </div>
                    <button className="btn btn-primary w-56 mt-3 rounded-full bg-button-main-light border-none hover:bg-button-main-light text-black normal-case">Confirm Account</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmOTP

