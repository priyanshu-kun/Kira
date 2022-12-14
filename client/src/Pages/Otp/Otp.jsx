import React, {  useState } from 'react'
import character from "../../assets/character.svg"
import { useNavigate, useSearchParams } from "react-router-dom"
import Navbar from '../../components/Navbar';
import { createAccount, verifyOTP } from '../../http';
import { toast } from 'react-toastify';
import {useSelector} from "react-redux"

function ConfirmOTP() {
    const authData = useSelector(state => state.auth)
    const [Otp, setOtp] = useState("");
    const {user: {email}} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [queryParams] = useSearchParams();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const createUser = {
                hash: authData.otp.hash,
                Email: authData.otp.Email,
                otp: Otp
            }
            const { data: otpData } = await verifyOTP(createUser)
            const user = {
                Email: authData.otp.Email,
                fullName: authData.user.fullName,
                username: authData.user.username,
                password: authData.user.password,
                avatar: authData.user.image
            }
            if (otpData.reqStatus) {
                const queryData = queryParams.get("data");
                const { data } = await createAccount({user, query: queryData})
            }
            navigate("/SignIn")
            toast.success("Account created successfully.", {
                icon: "🎉"
            })
        }
        catch (e) {
            toast.error("OOPS, Something bad happen. Please try again", {
                icon: "😰"
            })
        }
    }

    return (
        <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
            <Navbar _Route={"SignUp"} />
            <img className='login-character-image absolute bottom-10 right-20' src={character} alt="" />
            <div className='form-body px-12 py-12 bg-white  w-form-width-otp  relative z-50 rounded-3xl shadow-sm'>
                <h1 className='signup__form__welcome text-center mb-4 text-2xl'>Agent Confirm</h1>
                <p className='text-center pt-2 pb-6 opacity-80 w-72 mx-auto'>Hey, we have just sent a verification code to  <span className='text-green-400'>{email}</span>.</p>
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit} action="">
                    <div className="form-control w-full mb-2">
                        <label htmlFor='otp' className="label">
                            <span className="label-text">Confirm your otp</span>
                        </label>
                        <div>
                            <input onChange={(e) => setOtp(e.target.value)} type="text" id='otp' placeholder='eg. xxxxxx' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div>
                    </div>
                    <button className="pushable normal-case mt-6 rounded-full">
                        <span className="front rounded-full w-56 text-sm py-3">
                            Confirm Account
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmOTP

