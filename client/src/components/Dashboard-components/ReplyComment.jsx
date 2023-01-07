import React from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ commentList, bugId, refreshComments, parentCommentId }) {



    return (
        <div>
            <button className='btn btn-primary'>View more comments</button>
            {

                commentList && commentList.map(cmt => {
                    return (
                        (cmt.respondTo && cmt.respondTo._id) === parentCommentId && (

                            <div className='ml-[50px]'>
                                <SingleComment comment={cmt} bugId={bugId} refreshComments={refreshComments} />
                                <ReplyComment commentList={commentList} parentCommentId={cmt._id} refreshComments={refreshComments} bugId={bugId} />
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}

export default ReplyComment