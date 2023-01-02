import projectService from "../services/project.service.js";
import emailService from "../services/email.service.js";
import UserService from "../services/user.service.js";
import tokenService from "../services/token.service.js"
import projectModel from "../model/project.model.js";
import timelineService from "../services/timeline.service.js";
const { createNewProject, fetchUserProjects, fetchDetails, removeProjectFromDB } = projectService;
const { sendMail } = emailService
const { findUserByEmail, findUserById } = UserService
const { generateTokensForInvitation, verifyAccessTokenForInvite } = tokenService
const { createNewActivity } = timelineService

class ProjectController {
    async createProject(req, res) {
        try {
            const project = await createNewProject(req.body)
            const user = await findUserById(project.owner);
            try {
                const payload = {
                    activityType: "newProjectCreated",
                    activityId: project._id,
                    avatar: user.avatar,
                    activity: {
                        title: project.title,
                        body: `New project created by @${project.projectLead}.`
                    },
                    link: `/details/project/${project._id}`
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            return res.json({
                reqStatus: true, data: project
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }

    async fetchUserProjects(req, res) {
        try {
            const user = await findUserById(req.query.id)
            const projects = await fetchUserProjects({ id: user._id, mail: user.email })
            return res.json({
                reqStatus: true, data: projects
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async fetchProjectDetails(req, res) {
        try {
            const details = await fetchDetails(req.query.id)
            return res.json({
                reqStatus: true, data: details
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async removeProject(req, res) {
        try {
            const { _id } = req.user;
            const id = req.body.projectId
            const user = await findUserById(_id);
            try {
                const details = await fetchDetails(id);
                if (details.owner.toString() !== _id.toString()) {
                    return res.status(400).json({ reqStatus: false, data: 'Only owner can delete the project.' });
                }
                try {
                    const payload = {
                        activityType: "deleteProject",
                        activityId: details._id,
                        avatar: user.avatar,
                        activity: {
                            title: details.title,
                            body: `Project deleted by @${details.projectLead}.`
                        }
                    }
                    await createNewActivity(payload)
                }
                catch (e) {
                    return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
                }
                await removeProjectFromDB(id)
            }
            catch (e) {
                throw new Error();
            }
            return res.json({
                reqStatus: true, data: {}
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async saveUserInProject(req, res) {
        const { key, projectId } = await verifyAccessTokenForInvite(req.params.id);
        try {
            const user = await findUserByEmail({ email: key });
            if (!user) {
                return res.writeHead(301, {
                    Location: `${process.env.FRONT_URL}/SignUp?data=${key + "*" + projectId}`
                }).end();
            }
            const project = await fetchDetails(projectId);
            if (project.users.length >= 50) {
                return res.writeHead(301, {
                    Location: `${process.env.FRONT_URL}/`
                }).end();
            }
            const isUserAlreadyInProject = project.users.find(s => s === key);
            if (isUserAlreadyInProject) {
                return res.writeHead(301, {
                    Location: `${process.env.FRONT_URL}/details/project/` + project._id
                }).end();
            }
            project.users.push(key);
            project.save()
            return res.writeHead(301, {
                Location: `${process.env.FRONT_URL}/details/project/` + projectId
            }).end();
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
    async sendInvite(req, res) {
        try {
            const key = req.body.invitationKey;
            const projectId = req.body.projectId;
            const { invitationToken } = await generateTokensForInvitation({ key, projectId })
            const url = process.env.BASE_URL + "/api/invite/user/project/" + invitationToken;
            try {
                await sendMail(key, url)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Cannot able to send invitation." });
            }
            return res.json({
                reqStatus: true, data: {}
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal server error." });
        }
    }
}

export default new ProjectController()