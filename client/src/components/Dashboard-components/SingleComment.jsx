import React from 'react'
import { useState } from 'react'
import { saveComment } from '../../http'
import {useSelector} from "react-redux"

function SingleComment({ comment, bugId, refreshComments }) {


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
            console.log(e)
        }
    }



    return (
        <div>
            <div >
                <div className='w-12 h-12 '>
                    <img src={comment.author.avatar} className="w-full h-full" alt="" />
                </div>
                <span>{comment.author.username}</span>
                <span>{comment.createdAt}</span>
            </div>
            <p>{comment.content}</p>
            <button className="btn">{comment.childComments ? comment.childComments.length: 0}</button>
            <button onClick={toogleReplyForm} className="btn">Reply</button>
            {
                reply && (
                    <form action="" onSubmit={handleInputSubmit}>
                        <input value={Comment} onChange={handleInputChange} type="text" className='text-black' />
                        <button type='submit'>submit</button>
                    </form>
                )
            }
        </div>
    )
}

export default SingleComment