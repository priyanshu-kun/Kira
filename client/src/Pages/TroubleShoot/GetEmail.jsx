import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'
import { troubleShootAccount } from '../../http'

function GetEmail() {

    const [emailAndUsername,setEmailAndUsername] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!emailAndUsername) {
                return toast.error("All fields are required.", {
                icon: "😓"
                })
            }
            const res = await troubleShootAccount({emailAndUsername})
            return toast.success("Please check your inbox.", {
                icon: "👀"
            })
        }
        catch(e) {
            toast.error(e.response.data.data, {
                icon: "😰"
            })
        }
    }


  return (
        <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
            <Navbar _Route={"SignUp"} />
            <div className='form-body px-12 py-12 bg-white  w-[500px]  relative z-50 rounded-3xl shadow-sm'>
                <h1 className='signup__form__welcome text-center mb-4 text-2xl'>Troubleshoot your account.</h1>
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit} action="">
                    <div className="form-control w-full mb-2">
                        <label htmlFor='otp' className="label">
                            <span className="label-text">Enter your email/username</span>
                        </label>
                        <div>
                            <input value={emailAndUsername} onChange={(e) => setEmailAndUsername(e.target.value)} type="text" id='email' placeholder='eg. jhonDoe@domain.com' className="block w-full text-center bg-secondary-light input input-bordered" />
                        </div>
                    </div>
                    <button className="pushable normal-case mt-6 rounded-full">
                        <span className="front rounded-full w-56 text-sm py-3">
                            Confirm
                        </span>
                    </button>
                </form>
            </div>
        </div>
  )
}

export default GetEmail