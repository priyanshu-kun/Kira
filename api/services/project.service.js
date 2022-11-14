import projectModel from "../model/project.model.js"

class ProjectService {
    async createNewProject(data) {
        return await projectModel.create(data)
    }
    async fetchUserProjects(id) {
        return await projectModel.find({owner: id})
    }
}

export default new ProjectService()