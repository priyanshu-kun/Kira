
import bugsModel from "../model/bugs.model.js"

class BugsService {
    async createNewBug(data) {
        return await bugsModel.create(data)
    }
    async fetchProjectBugs(id) {
        return await bugsModel.find({ProjectId: id}).populate("ProjectId").exec()
    }
    async fetchBugsDetails(id) {
        return await bugsModel.findOne({_id: id})
    }
    async removeBug(id) {
        return await bugsModel.deleteOne({_id: id});
    }
    async UpdateBug(id,payload) {
        return await bugsModel.updateOne({_id: id},payload)
    }
}

export default new BugsService()