
import bugsModel from "../model/bugs.model.js"

class BugsService {
    async createNewBug(data) {
        return await bugsModel.create(data)
    }
    async fetchProjectBugs(id,skp,lmt) {
        return await bugsModel.find({ProjectId: id}).populate("ProjectId").skip(skp).limit(lmt).exec()
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
    async deleteAllBugsRelatedToUser(id) {
        return await bugsModel.deleteMany({Reporter: id})
    }
    async countBugsDocuments() {
        return await bugsModel.countDocuments()
    }
}

export default new BugsService()