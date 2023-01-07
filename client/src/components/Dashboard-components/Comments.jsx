import React from 'react'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { saveComment } from '../../http'
import SingleComment from './SingleComment'
import ReplyComment from "./ReplyComment"

function Comments({ bugId, refreshComments, commentList }) {

  const [Comment, setComment] = useState("")
  const { user } = useSelector(state => state.user)

  function handleInputChange(e) {
    setComment(e.target.value)
  }


  async function handleInputSubmit(e) {
    e.preventDefault()
    try {
      const payload = {
        content: Comment,
        bugId,
        author: user.id
      }
      const { data: { data } } = await saveComment(payload)
      refreshComments(data)
      setComment("")
    }
    catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      <h1 className="dashboard-logo w-fit font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2 mb-2">Discuss</h1>
      <form action="" onSubmit={handleInputSubmit}>
        <input value={Comment} onChange={handleInputChange} type="text" className='text-black' />
        <button type='submit'>submit</button>
      </form>
      {
        commentList && commentList.map(cmt => {
          return (
            (cmt && !cmt.respondTo) && (
              <>
                <SingleComment comment={cmt} bugId={bugId} refreshComments={refreshComments} />
                <ReplyComment commentList={commentList} bugId={bugId}  refreshComments={refreshComments} parentCommentId={cmt._id}   />
              </>
            )
          )
        })
      }
    </div>
  )
}

export default Comments