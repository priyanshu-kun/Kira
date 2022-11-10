import projectModel from "../model/project.model.js"

class ProjectService {
    async createNewProject(data) {
        return await projectModel.create(data)
    }
}

export default new ProjectService()