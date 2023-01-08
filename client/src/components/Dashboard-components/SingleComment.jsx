import React from 'react'
import { useState } from 'react'
import { saveComment } from '../../http'
import { useSelector } from "react-redux"
import CommentForm from './CommentForm'
import moment from "moment"
import { FaReply } from 'react-icons/fa'
import { toast } from "react-toastify"

function SingleComment({ comment, bugId, refreshComments, parentData }) {


    const [Comment, setComment] = useState("")
    const [reply, setReply] = useState(false)
    const { user } = useSelector(state => state.user)
    function handleInputChange(e) {
        setComment(e.target.value)
    }


    function toogleReplyForm() {
        setReply(prev => !prev)
    }

    async function handleInputSubmit(e) {
        e.preventDefault()
        try {
            const payload = {
                content: Comment,
                bugId,
                author: user.id,
                respondTo: comment._id
            }
            const { data: { data } } = await saveComment(payload)
            console.log(data)
            toogleReplyForm()
            refreshComments(data)
            setComment("")
        }
        catch (e) {
            return toast.error("Cannot load comments.", {
                icon: "😓"
            })
        }
    }



    return (
        <div className={`${!comment.respondTo ? "mt-8 p-6 rounded-lg bg-[#0a0a0a] border-[2px] border-solid border-white/10" : "mt-8 ml-[50px] border-l-[3px] py-3 border-solid border-white/10 pl-6"}`}>
            <div className='flex items-center'>
                <div className='w-10 h-10 mr-2 rounded-full border-2px border-solid border-accent-color  overflow-hidden'>
                    <img src={comment.author.avatar} className="w-full h-full" alt="" />
                </div>
                <span className='mr-4 text-white text-lg'>@ {comment.author.username}</span>
                <span className='text-sm'>{moment(comment.createdAt).format("MMM D, YYYY / h:mm:ss a")}</span>
            </div>
            <p className='my-3 ml-2 text-xl'>{(parentData && parentData.username) && <span className='text-blue-400 text-lg mr-2 details'>@{parentData.username}</span>}{comment.content}</p>
            <div className="divider"></div>
            <div className='flex items-center justify-between'>
                <button className="min-w-[48px] h-12 p-3 rounded-lg border border-solid border-white/10 bg-accent-color/5 text-white">{comment.childComments ? comment.childComments.length : 0}</button>
                <div>
                    {
                        user ? (

                    <button onClick={toogleReplyForm} className="btn bg-blue-400 hover:bg-blue-400 normal-case text-black">Reply<FaReply className='ml-2' /></button>
                        ): (

                    <button className="btn bg-blue-400 hover:bg-blue-400 normal-case important-text-white border-2px border-solid border-white/30" disabled>Reply<FaReply className='ml-2 text-white' /></button>
                        )
                    }
                </div>
            </div>
            {
                reply && (
                    <CommentForm closeCommentForm={toogleReplyForm} handleComment={handleInputChange} handleCommentSubmit={handleInputSubmit} user={user} comment={Comment} type={"reply"} replyingUsername={comment.author.username} />
                )
            }
        </div>
    )
}

export default SingleComment