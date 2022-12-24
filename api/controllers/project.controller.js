import projectService from "../services/project.service.js";
import emailService from "../services/email.service.js";
import UserService from "../services/user.service.js";
import tokenService from "../services/token.service.js"
import projectModel from "../model/project.model.js";
const {createNewProject,fetchUserProjects,fetchDetails,removeProjectFromDB} = projectService;
const { sendMail } = emailService
const {findUserByEmail} = UserService
const {generateTokensForInvitation,verifyAccessTokenForInvite} = tokenService

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
        const {key,projectId} = await verifyAccessTokenForInvite(req.params.id);
        try {
            const user = await findUserByEmail({email: key});
            if(!user) {
                return res.writeHead(301, {
                    Location: `${process.env.FRONT_URL}/SignUp?data=${key+"*"+projectId}`
                }).end();
            }
            const project = await projectModel.findOne({_id: projectId});
            project.users.push(key);
            project.save()
            return res.writeHead(301, {
                Location: `${process.env.FRONT_URL}/SignIn`
            }).end();
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async sendInvite(req,res) {
        try {
            const key = req.body.invitationKey;
            const projectId = req.body.projectId;
            const {invitationToken} = await generateTokensForInvitation({key,projectId})
            const url = process.env.BASE_URL+"/api/invite/user/project/"+invitationToken;
            try {
                await sendMail(key,url)
            }
            catch(e) {
                return res.status(500).json({ reqStatus: false, data: "Cannot able to send invitation." });
            }
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
}

export default new ProjectController()