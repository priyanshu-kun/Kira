import React, { useEffect } from 'react'
import { useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ comment, commentList, bugId, refreshComments, parentCommentId,parentData }) {

    const [Replies, setReplies] = useState(false)

    function toogleReplies() {
        setReplies(prev => !prev)
    }

    return (
        <div>
            {
                comment.childComments.length > 0 && (
                    <button onClick={toogleReplies} className={`text-blue-400 mt-2  ${comment.respondTo ? "ml-[70px]": "ml-4"}`}>show more replies</button>
                )
            }
            {
                Replies && commentList && commentList.map(cmt => {
                    return (
                        (cmt.respondTo && cmt.respondTo._id) === parentCommentId && (
                            <div key={cmt._id}>
                                <SingleComment parentData={parentData} comment={cmt} bugId={bugId} refreshComments={refreshComments} />
                                <ReplyComment  comment={cmt} commentList={commentList} parentCommentId={cmt._id} refreshComments={refreshComments} bugId={bugId} parentData={cmt.author} />
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}

export default ReplyComment