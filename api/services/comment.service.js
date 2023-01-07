import commentModel from "../model/comment.model.js"

class CommentService {
    async saveNewComment(data) {
        return await commentModel.create(data)
    }
    async getComment(id) {
        return await commentModel.findById({_id: id}).populate('bugId').populate('author').populate('respondTo').exec()
    }
    async getCommentsFromDB(id) {
        return await commentModel.find({bugId: id}).populate('bugId').populate('author').populate('respondTo').exec()
    }
}

export default new CommentService()