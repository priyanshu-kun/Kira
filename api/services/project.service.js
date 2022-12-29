import bugsModel from "../model/bugs.model.js";
import projectModel from "../model/project.model.js"

class ProjectService {
    async createNewProject(data) {
        return await projectModel.create(data)
    }
    async fetchUserProjects({ id, mail }) {
        return await projectModel.find({
            $or: [
                { users: { $in: [mail] } },
                { owner: id }
            ]
        })
    }
    async fetchDetails(id) {
        return await projectModel.findOne({ _id: id })
    }
    async removeProjectFromDB(id) {
        await bugsModel.deleteMany({ ProjectId: id });
        return await projectModel.deleteOne({ _id: id })
    }
}

export default new ProjectService()