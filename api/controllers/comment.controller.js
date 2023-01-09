import commentService from "../services/comment.service.js";
import userService from "../services/user.service.js";
import timelineService from "../services/timeline.service.js";
const {saveNewComment,getComment,getCommentsFromDB,saveNewCommentWithChild} = commentService
const {findUserById} = userService
const {createNewActivity} = timelineService

class commentController {
    async saveComment(req,res) {
        try {
            const { _id } = req.user;
            if(!req.body && !req.body.content) {
                return res.status(404).json({ reqStatus: false, data: "Comment cannot be empty." });
            }
            const user = await findUserById(_id);
            let savedComment;
            if(req.body.respondTo) {
                savedComment = await saveNewCommentWithChild(req.body,req.body.respondTo)
                const respondedUser = await findUserById(savedComment.respondTo.author)
                try {
                    const payload = {
                        activityType: "reply",
                        activityId: savedComment._id,
                        avatar: user.avatar,
                        activity: {
                            title: user.username,
                            body: ` replies by @${respondedUser.username}`
                        }
                    }
                    await createNewActivity(payload)
                }
                catch (e) {
                    return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
                }
            }
            else {
                savedComment = await saveNewComment(req.body)
                try {
                    const payload = {
                        activityType: "comment",
                        activityId: savedComment._id,
                        avatar: user.avatar,
                        activity: {
                            title: user.username,
                            body: ` creates a new comment on an ${savedComment.bugId.Name} bug`
                        }
                    }
                    await createNewActivity(payload)
                }
                catch (e) {
                    return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
                }
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