import React from 'react'
import { useState } from 'react'
import loaderForBtn from "../../../assets/loader.gif"

function ShowPassword({showPassword,passwordLoader,setPassword,password}) {
    return (
        <>
            < input type="checkbox" id="show-pass" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black border-2px border-solid border-white/10 p-8 -top-[260px]">
                    <label onClick={(e) => {
                        setPassword("")
                    }} htmlFor="show-pass" className="btn btn-sm btn-circle absolute right-2 top-2 bg-white/10">✕</label>
                    <h3 className='text-white mb-4 text-lg'>Please enter your password below.</h3>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="text" placeholder="Password" className="input   text-white text-base input-bordered w-full max-w-xs bg-[#0a0a0a] border-2px border-solid border-white/10" />
                    <label htmlFor="show-pass"  className={`btn  text-black  mx-auto mt-4 w-[200px] normal-case flex items-center justify-center bg-green-400 hover:bg-green-500`} onClick={showPassword} >{passwordLoader ? <img src={loaderForBtn} className="w-[40px] object-contain" alt="loader" />: "Submit"}</label>
                </div> 
            </div>
        </>
    )
}

export default ShowPassword