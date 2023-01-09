import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom"
import { forgotPassword } from '../../http'


function ResetPassword() {


    const [passwordState, setPasswordState] = useState({ password: "", confirmPassword: "" })
    const navigate = useNavigate()
    const { id } = useParams()


    function handleInputs(e) {
        setPasswordState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!passwordState.password || !passwordState.confirmPassword) {
                return toast.error("All fields are required.", {
                    icon: "😓"
                })
            }
            const res = await forgotPassword({ passwordState }, id)
            if (res.data.reqStatus === false) {
                toast.error("Something bad happen.", {
                    icon: "😰"
                })
            }
            navigate("/SignIn")
            return toast.success("Please login with your new password.", {
                icon: "👏"
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
            <Navbar _Route={"SignUp"} />
            <div className='form-body px-12 py-12 bg-white  w-[500px]  relative z-50 rounded-3xl shadow-sm'>
                <h1 className='signup__form__welcome text-center mb-4 text-2xl'>Reset Password.</h1>
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit} action="">
                    <div className="form-control w-full mb-2">
                        <label htmlFor='otp' className="label">
                            <span className="label-text">Enter your password</span>
                        </label>
                        <div>
                            <input name='password' value={passwordState.password} onChange={handleInputs} type="password" id='password' placeholder='hint, something strong' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control w-full mb-2">
                        <label htmlFor='otp' className="label">
                            <span className="label-text">Confirm password</span>
                        </label>
                        <div>
                            <input name='confirmPassword' value={passwordState.confirmPassword} onChange={handleInputs} type="password" id='password' placeholder='hint, something strong' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div>
                    </div>
                    <button className="pushable normal-case mt-6 rounded-full">
                        <span className="front rounded-full w-56 text-sm py-3">
                            Submit
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword