import React from 'react'
import { FaArrowRight, FaSmile } from 'react-icons/fa'
import {FiX} from "react-icons/fi"
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

function CommentForm({ closeCommentForm, setComment, handleCommentSubmit, handleComment, user, comment, type, replyingUsername }) {
    const [emoji, setEmoji] = useState(false)
    const [emojiBtn, setEmojiBtn] = useState(false)
    return (
        <div className='fixed bottom-0 left-0 h-[300px] border-t-2px border-solid border-white/10 bg-[#000] right-0'>
            {
                emoji && (
                    <div className='absolute top-0 left-0'>
                        <EmojiPicker theme="dark" height={300} onEmojiClick={(emg) => setComment(prev => prev += emg.emoji)} />
                    </div>
                )
            }
            <div className='w-[60%] h-full mx-auto flex items-start justify-start mt-6'>
                <div className='w-full h-full'>
                    <div>
                        <div className='flex mb-1 ml-3'>
                            <div className='w-6 h-6 rounded-full overflow-hidden  mr-2 flex items-center justify-center border-[2px] border-solid  border-accent-color '>
                                <img className='w-full h-full object-cover ' src={user.avatar} alt="avatar" />
                            </div>
                            <h3 className='mb-1 text-blue-400 flex items-center'>@{user.username} {(type !== "root" && replyingUsername) && (
                                <>
                                    <span className='text-white/30 mx-3 flex items-center'>replies to<FaArrowRight className='ml-1' /></span><span>@{replyingUsername}</span>
                                </>
                            )} </h3>
                        </div>
                        <textarea name="Bio" placeholder='Begin discussion' type="text" value={comment} onChange={handleComment} className="textarea input-bordered max-w-xs w-full border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg min-h-[140px]" />
                    </div>

                    <div className='flex items-center justify-between mt-2'>
                        <button onClick={() => {
                            setEmoji(prev => !prev)
                            setEmojiBtn(prev => !prev)
                        }} className='btn bg-none border-none hover:bg-none'>{
                                emojiBtn ? (
                                    <FiX className='text-xl' />
                                ) : (
                                    <FaSmile className='text-xl' />
                                )
                            }</button>
                        <div>
                            <button onClick={closeCommentForm} className='btn mr-3 normal-case'>Cancel</button>
                            <button onClick={handleCommentSubmit} className='btn bg-green-400 hover:bg-green-400 border-none text-black normal-case'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentForm