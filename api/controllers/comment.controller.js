import commentService from "../services/comment.service.js";
const {saveNewComment,getComment,getCommentsFromDB,saveNewCommentWithChild} = commentService

class commentController {
    async saveComment(req,res) {
        try {
            if(!req.body && !req.body.content) {
                return res.status(404).json({ reqStatus: false, data: "Comment cannot be empty." });
            }
            let savedComment;
            if(req.body.respondTo) {
                savedComment = await saveNewCommentWithChild(req.body,req.body.respondTo)
            }
            else {
                savedComment = await saveNewComment(req.body)
            }
            if(!savedComment) {
                return res.status(404).json({ reqStatus: false, data: "Error while saving comment" });
            }
            const comment = await getComment(savedComment._id)
            return res.json({reqStatus: true,data: comment})
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error save comment." });
        }
    }
    async getComments(req,res) {
        try {
            const {id} = req.params;
            const comments = await getCommentsFromDB(id)
            return res.json({reqStatus: true,data: comments})
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Cannot able to fetch comments." });
        }
    }
}

export default new commentController()