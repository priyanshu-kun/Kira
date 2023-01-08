import React, { useState } from 'react'
import { FaSignOutAlt } from "react-icons/fa"
import { userLogout } from '../../http'
import { useDispatch } from 'react-redux'
import { setUser } from "../../store/user.slice"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)

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
            toast.error(e.response.data.data, {
                icon: "😰"
            })
        }
    }


    return (
        <div className='dashboard-navbar fixed top-0 flex justify-between items-center px-20 left-0 right-0 z-50 h-16 bg-black'>
            <Link to="/" className='dashboard-logo text-lg text-white'>Kira</Link>
            <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center mr-8'>
                    <p className='navbar-username text-white opacity-80'><span className='text-button-main-light mr-1'>@</span>{user !== null ? user.username : "Username"}</p>
                    {
                        !user && (
                            <Link className='btn ml-2 normal-case  bg-amber-400 hover:bg-amber-400  text-black' to="/SignIn">Sign In</Link>
                        )
                    }
                </div>
                {
                    user && <button onClick={handleSignOut} className='logout-button-pd bg-red-400 p-2 rounded-full'><FaSignOutAlt className='text-white text-base' /></button>
                }
            </div>
        </div>
    )
}

export default Navbar