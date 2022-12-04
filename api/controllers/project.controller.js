import projectService from "../services/project.service.js";
const {createNewProject,fetchUserProjects,fetchDetails,removeProjectFromDB} = projectService;


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
    async removeProject(req,res) {
        try {
            const id = req.body.projectId
            try {
                await removeProjectFromDB(id)
            }
            catch(e) {
                throw new Error();
            }
            return res.json({
                reqStatus: true, data: {}
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async saveUserInProject(req,res) {
        console.log(req.params.id)
        res.writeHead(301, {
            Location: `https://piped.kavin.rocks/watch?v=LuNmfDmeCTc&list=49ae4cb4-5cda-4ff6-9e03-ced182c17ccd&index=6`
        }).end();
    }
}

export default new ProjectController()