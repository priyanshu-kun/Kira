import projectService from "../services/project.service.js";
const {createNewProject,fetchUserProjects,fetchDetails} = projectService;


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

    async fetchUserProjects(req,res) {
        try {
            const projects = await fetchUserProjects(req.query.id)
            return res.json({
                reqStatus: true, data: projects
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async fetchProjectDetails(req,res) {
        try {
            const details = await fetchDetails(req.query.id)
            return res.json({
                reqStatus: true, data: details
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
}

export default new ProjectController()