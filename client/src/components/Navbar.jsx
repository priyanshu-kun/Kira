import React from 'react'
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi";

function Navbar({_Route}) {
    const map = {
        "SignUp": "Sign Up",
        "SignIn":"Sign In",
    }
    return (
        <div className='auth-header flex w-3/4 mx-auto justify-between py-6 fixed top-0 left-1/2 transform -translate-x-1/2'>
            <div className=' flex flex-col'>
                <h1 className='logo text-xl'>Kira </h1>
                <span className='logo-data flex items-center mt-5 text-base opacity-60'><span className='mr-2'>priyanshusharma.me</span> <FiArrowRight /></span>
            </div>
            <Link to={"/"+_Route} class="btn btn-active btn-ghost normal-case tex-sm text-black/60">{map[_Route]}</Link>
        </div>
    )
}

export default Navbar