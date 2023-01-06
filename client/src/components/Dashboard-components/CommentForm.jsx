// import React from 'react'
// import { FaArrowRight, FaSmile } from 'react-icons/fa'

// function CommentForm({ closeCommentForm, handleCommentSubmit, handleComment, user, comment, type,replyingUsername }) {
//     return (
//         <div className='fixed bottom-0 left-0 h-[300px] border-t-2px border-solid border-white/10 bg-[#000] right-0'>
//             <div className='w-[60%] h-full mx-auto flex items-start justify-start mt-6'>
//                 {/* <div className='w-16 h-16 rounded-full overflow-hidden mr-6 mt-3 flex items-center justify-center border-[3px] border-solid  border-accent-color absolute top-[16px] left-[308px]'>
//                     <img className='w-full h-full object-cover ' src={user.avatar} alt="avatar" />
//                 </div> */}
//                 <div className='w-full h-full'>
//                     <div>
//                         <h3 className='mb-1 text-blue-400 flex items-center'>@{user.username} {(type !== "root" && replyingUsername) && (
//                             <>
//                                 <span className='text-white/30 mx-3 flex items-center'>replies to<FaArrowRight className='ml-1' /></span><span>@{replyingUsername}</span>
//                             </>
//                         )} </h3>
//                         <textarea name="Bio" placeholder='Begin discussion' type="text" value={comment} onChange={handleComment} className="textarea input-bordered max-w-xs w-full border-2px border-solid border-white/10 bg-[#0a0a0a] text-lg min-h-[140px]" />
//                     </div>
//                     <div className='flex items-center justify-between mt-2'>
//                         <button className='btn bg-none border-none hover:bg-none'><FaSmile className='text-xl' /></button>
//                         <div>
//                             <button onClick={closeCommentForm} className='btn mr-3 normal-case'>Cancel</button>
//                             <button onClick={handleCommentSubmit} className='btn bg-green-400 hover:bg-green-400 border-none text-black normal-case'>Submit</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CommentForm