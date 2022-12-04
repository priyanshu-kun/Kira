import projectModel from "../model/project.model.js"

class ProjectService {
    async createNewProject(data) {
        return await projectModel.create(data)
    }
    async fetchUserProjects(id) {
        return await projectModel.find({owner: id})
    }
    async fetchDetails(id) {
        return await projectModel.findOne({_id: id})
    }
    async removeProjectFromDB(id) {
        return await projectModel.deleteOne({_id: id})
    }
}

export default new ProjectService()