
import bugsModel from "../model/bugs.model.js"

class BugsService {
    async createNewBug(data) {
        return await bugsModel.create(data)
    }
}

export default new BugsService()