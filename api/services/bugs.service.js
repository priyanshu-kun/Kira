
import bugsModel from "../model/bugs.model.js"

class BugsService {
    async createNewBug(data) {
        return await bugsModel.create(data)
    }
    async fetchProjectBugs(id) {
        return await bugsModel.find({ProjectId: id}).populate("ProjectId").exec()
    }
}

export default new BugsService()