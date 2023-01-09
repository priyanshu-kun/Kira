import commentModel from "../model/comment.model.js"

class CommentService {
    async saveNewComment(data) {
        const doc = await commentModel.create(data)
        return await commentModel.findById({_id: doc._id}).populate('bugId').populate('author').populate('respondTo').exec()
    }
    async getComment(id) {
        return await commentModel.findById({_id: id}).populate('bugId').populate('author').populate('respondTo').exec()
    }
    async getCommentsFromDB(id) {
        return await commentModel.find({bugId: id},{},{sort: {createdAt: -1}}).populate('bugId').populate('author').populate('respondTo').exec()
    }
    async saveNewCommentWithChild(data,parentCmt) {
        const doc = await commentModel.create(data)
        await commentModel.updateOne({_id: parentCmt},{$push: {childComments: doc._id}})
        return await commentModel.findById({_id: doc._id}).populate('bugId').populate('author').populate('respondTo').exec()
    }
}

export default new CommentService()