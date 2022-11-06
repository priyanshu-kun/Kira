import React, { useState } from 'react'
import { FaSignOutAlt } from "react-icons/fa"
import { userLogout } from '../../http'
import { useDispatch } from 'react-redux'
import { setUser } from "../../store/user.slice"
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"

function Navbar() {

    const dispatch = useDispatch()
  const navigate = useNavigate()

    async function handleSignOut() {
        try {
            const { data } = await userLogout()
            if (data.reqStatus) {
                const User = {
                    auth: data.data.auth,
                    user: data.data.userDto
                }
                dispatch(setUser(User))
                navigate('/SignIn')
            }
            toast.success("See you again.", {
                icon: "👋"
            })

        }
        catch (e) {
            console.log(e)
            toast.error(e.response.data.data, {
                icon: "😰"
            })
        }
    }


    return (
        <div className='absolute top-0 flex justify-between items-center px-20 left-0 right-0 z-50 h-16 bg-black border-b-2  border-solid  border-b-gray-900'>
            <div className='dashboard-logo text-lg text-white'>Kira</div>
            <div>
                <button onClick={handleSignOut} className='logout-button-pd bg-red-400 p-2 rounded-full'><FaSignOutAlt className='text-white text-base' /></button>
            </div>
        </div>
    )
}

export default Navbar