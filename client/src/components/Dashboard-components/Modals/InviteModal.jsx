import React,{useState} from 'react'

function InviteModal({handleSendInvite}) {

    const [inviteInput,setInviteInput] = useState("");


    return (
        <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer bg-black/30">
                <label className="modal-box relative  bottom-60 bg-black border-2px border-solid border-white/10" htmlFor="">
                    <h3 className="text-lg font-bold">🎉 Add people to Kira Software.</h3>
                    <span className="label-text mt-6 ml-2 block">Enter Username or Email?</span>
                    <input type="text" value={inviteInput} onChange={(e) => setInviteInput(e.target.value)} placeholder="eg. @username/Email" className="input input-bordered w-full bg-transparent max-w-xs mt-2 py-3" />
                    <div className="modal-action flex justify-end items-center">
                        <label htmlFor="my-modal-4" onClick={() => setInviteInput("")} className='cursor-pointer mr-3'>Close</label>
                        <label onClick={(e) => {
                            handleSendInvite(e,inviteInput)
                            setInviteInput("");
                        }} htmlFor="my-modal-4" className="btn normal-case px-6 hover:bg-accent-color bg-button-main-light text-black">
                            Send
                        </label >
                    </div>
                </label>
            </label>
        </>
    )
}

export default InviteModal