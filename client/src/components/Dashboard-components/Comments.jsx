import React from 'react'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { getComments, saveComment } from '../../http'
import SingleComment from './SingleComment'
import ReplyComment from "./ReplyComment"
import CommentForm from './CommentForm'
import EmojiPicker from 'emoji-picker-react'

function Comments({ bugId, refreshComments, commentList }) {

  const [Comment, setComment] = useState("")
  const { user } = useSelector(state => state.user)
  const [form, setForm] = useState(false)
  const [Replies, setReplies] = useState(false)

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
      const { data } = await saveComment(payload)
      const {data: {reqStatus,data:commentsFromDB}} = await getComments(bugId)
      if(reqStatus) {
        refreshComments(commentsFromDB)
      }
      setComment("")
      setForm(false)
    }
    catch (e) {
      console.log(e)
    }
  }


  function closeForm(e) {
    setForm(false)
  }

  function openForm(e) {
    setForm(true)
  }




  return (
    <div className='mt-[100px] w-[80%] mx-auto'>
      <h1 className="dashboard-logo w-fit font-['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'] text-2xl mr-2 mb-6">Discuss</h1>
      {
        user ? (
          <button onClick={openForm} className="btn btn-primary bg-green-400 hover:bg-green-400 normal-case text-black border-none w-[220px]">Start Discussion</button>
        ) : (
          <button className="btn btn-primary bg-green-400 hover:bg-green-400 normal-case important-text-white w-[220px] border-2px border-solid border-white/30" disabled>Start Discussion</button>
        )
      }
      {
        form && (
          <CommentForm closeCommentForm={closeForm} setComment={setComment}  handleComment={handleInputChange} handleCommentSubmit={handleInputSubmit} user={user} comment={Comment} type={"root"} replyingUsername={null} />
        )
      }
      <div className='mt-[50px]'>
        {
          commentList && commentList.length === 0 ? (
            <h1 className='text-center details mt-24 text-2xl'>No Comments 🙃</h1>
          ) : commentList && commentList.map((cmt, index) => {
            return (
              (cmt && !cmt.respondTo) && (
                <>
                  <SingleComment key={cmt._id} parentUsername={null} comment={cmt} bugId={bugId} refreshComments={refreshComments} />
                  <ReplyComment key={index} comment={cmt} commentList={commentList} bugId={bugId} refreshComments={refreshComments} parentCommentId={cmt._id} parentData={cmt.author} />
                </>
              )
            )
          })
        }
      </div>
    </div>
  )
}

export default Comments