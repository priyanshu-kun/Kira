import projectService from "../services/project.service.js";
const {createNewProject} = projectService;


class ProjectController {
    async createProject(req,res) {
       try {
            const project = await createNewProject(req.body) 
            return res.json({
                reqStatus: true, data: project
            })
       } 
       catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
       }
    }
}

export default new ProjectController()