import React from 'react'
import { useState } from 'react'
import loaderForBtn from "../../../assets/loader.gif"

function ConfirmationModal({handleDeleteAccount,deleteLoader}) {
    const [val,setVal] = useState("")
    const [flag,setFlag] = useState(false)
    return (
        <>
            < input type="checkbox" id="confirm" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black border-2px border-solid border-red-400/10 p-8 -top-[260px]">
                    <label onClick={(e) => {
                        setVal("")
                        setFlag(false)
                    }} htmlFor="confirm" className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-400/10">✕</label>
                    <h3 className='text-white mb-4'>Please type <b className='text-red-400'>CONFIRM</b> to delete your account.</h3>
                    <input value={val} onChange={(e) => {
                        setVal(prev => {
                            prev = e.target.value.toUpperCase();
                            if(prev === "CONFIRM") {
                                setFlag(true)
                            }
                            else {
                                setFlag(false)
                            }
                            return prev;
                        })
                    }} type="text" placeholder="CONFIRM" className="input uppercase  text-white text-lg input-bordered w-full max-w-xs bg-[#0a0a0a] border-2px border-solid border-white/10" />
                    <button className={`btn  text-black  mx-auto mt-4 w-[200px] flex items-center justify-center ${flag ? "bg-red-400 hover:bg-red-500 pointer-events-auto": "bg-gray-600 hover:bg-gray-600 pointer-events-none"}`} onClick={handleDeleteAccount} >{deleteLoader ? <img src={loaderForBtn} className="w-[40px] object-contain" alt="loader" />: "Good bye!"}</button>
                </div> 
            </div>
        </>
    )
}

export default ConfirmationModal