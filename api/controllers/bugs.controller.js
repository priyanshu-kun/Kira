import Jimp from "jimp";
import bugsService from "../services/bugs.service.js";
import userService from "../services/user.service.js";
import timelineService from "../services/timeline.service.js";
import url from "url"
const { createNewBug, fetchProjectBugs, fetchBugsDetails, removeBug,UpdateBug,countBugsDocuments } = bugsService;
const {findUserById} = userService
const {createNewActivity,UpdateActivity} = timelineService
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

class BugsController {
    async createNewBug(req, res) {
        try {
            let imagePath;
            const {_id} = req.user;
            let payloadFromClient = req.body;
            try {
                if (payloadFromClient.Attachment.img !== "") {
                    const matches = payloadFromClient.Attachment.img.match(/^data:image\/(png|jpg|jpeg|gif);base64,/);
                    let extension = "";
                    if (matches) {
                        extension = matches[1];
                    }
                    if (extension === "gif") {
                        return res.status(500).json({ reqStatus: false, data: "Error, while storing image." });
                    }
                    const buffer = Buffer.from(payloadFromClient.Attachment.img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), "base64")
                    imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`
                    const jimpResp = await Jimp.read(buffer)
                    let h = jimpResp.bitmap.height
                    let w = jimpResp.bitmap.width
                    jimpResp
                        .write(path.resolve(__dirname, `../storage/${imagePath}`))
                    payloadFromClient.Attachment.img = `${process.env.BASE_URL}/storage/${imagePath}`;
                    payloadFromClient.Attachment.width = w;
                    payloadFromClient.Attachment.height = h;

                }
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error, while storing image." });
            }
            if (payloadFromClient.AssignedTo !== "") {
                payloadFromClient = {
                    ...req.body,
                    isAssigned: true,
                }
            }
            const createdBug = await createNewBug(payloadFromClient)
            const user = await findUserById(_id)
            try {
                const payload = {
                    activityType: "newBugCreated",
                    activityId: createdBug._id,
                    avatar: user.avatar,
                    activity: {
                        title: createdBug.Name,
                        body: `@${createdBug.ReporterName} creates a new bug in the ${createdBug.ProjectName} project.`
                    },
                    link: `/bug/${createdBug.ProjectId}/${createdBug._id}`
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            return res.json({
                reqStatus: true, data: createdBug
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Error while creating new bug." });
        }
    }
    async fetchRelatedToAProject(req, res) {
        try {
            const { id } = req.params;
            const parsedUrl = url.parse(req.url, true);
            const queryParams = parsedUrl.query;
            const {skip,limit} = queryParams;
            const count = await countBugsDocuments(id);
            const totalPages = Math.ceil(count / limit);
            const bugs = await fetchProjectBugs(id,skip,limit)
            return res.json({
                reqStatus: true, data: {bugs,count,totalPages}
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Error while fetching bugs." });
        }
    }
    async fetchBugDetails(req, res) {
        try {
            const { id } = req.params;
            const details = await fetchBugsDetails(id)
            return res.json({
                reqStatus: true, data: details
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Error while fetching details." });
        }
    }
    async removeBugFromProject(req, res) {
        try {
            const { id } = req.params;
            const {_id} = req.user;
            const user = await findUserById(_id)
            const bug = await fetchBugsDetails(id)
            try {
                const payload = {
                    activityType: "deleteBug",
                    activityId: bug._id,
                    avatar: user.avatar,
                    activity: {
                        title: bug.Name,
                        body: `@${bug.ReporterName} delete a bug in the ${bug.ProjectName} project.`
                    }
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            await removeBug(id)
            return res.json({
                reqStatus: true, data: {}
            })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Error while removing bug." });
        }
    }
    async updateBug(req,res) {
        try {
            
            const { id } = req.params;
            const {_id} = req.user;
            const payloadFromClient = {
                ...req.body
            }
            let imagePath;
            try {
                if (payloadFromClient.Attachment !== undefined && payloadFromClient.Attachment.img !== "") {
                    const matches = payloadFromClient.Attachment.img.match(/^data:image\/(png|jpg|jpeg|gif);base64,/);
                    let extension = "";
                    if (matches) {
                        extension = matches[1];
                    }
                    if (extension === "gif") {
                        return res.status(500).json({ reqStatus: false, data: "Error, while storing image." });
                    }
                    const buffer = Buffer.from(payloadFromClient.Attachment.img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), "base64")
                    imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`
                    const jimpResp = await Jimp.read(buffer)
                    let h = jimpResp.bitmap.height
                    let w = jimpResp.bitmap.width
                    jimpResp
                        .write(path.resolve(__dirname, `../storage/${imagePath}`))
                    payloadFromClient.Attachment.img = `${process.env.BASE_URL}/storage/${imagePath}`;
                    payloadFromClient.Attachment.width = w;
                    payloadFromClient.Attachment.height = h;

                }
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error, while storing image." });
            }
            await UpdateBug(id,payloadFromClient)
            const bug = await fetchBugsDetails(id)
            const user = await findUserById(_id)
            try {
                const payload = {
                    activityType: "bugUpdated",
                    activityId: bug._id,
                    avatar: user.avatar,
                    activity: {
                        title: bug.Name,
                        body: `@${bug.ReporterName} updates a bug in the ${bug.ProjectName} project.`
                    },
                    link: `/bug/${bug.ProjectId}/${bug._id}`
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            return res.json({
                reqStatus: true, data: bug 
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while updating bug." });
        }
    }
    async resolveBug(req,res) {
        try {
            const {id} = req.params; 
            const {_id} = req.user;
            await UpdateBug(id,{isResolve: true})
            const bug = await fetchBugsDetails(id)
            const user = await findUserById(_id)
            try {
                const payload = {
                    activityType: "resolveBug",
                    activityId: bug._id,
                    avatar: user.avatar,
                    activity: {
                        title: bug.Name,
                        body: `@${bug.ReporterName} closed a bug in the ${bug.ProjectName} project.`
                    },
                    isResolve: {
                        flag: true,
                        bugId: bug._id
                    },
                    link: `/bug/${bug.ProjectId}/${bug._id}`
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            return res.json({
                reqStatus: true, data: bug 
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while updating bug." });
        }
    }
    async unResolve(req,res) {
        try {
            const {id,activityId} = req.params; 
            const {_id} = req.user;
            await UpdateBug(id,{isResolve: false})
            await UpdateActivity(activityId,false)
            const bug = await fetchBugsDetails(id)
            if(!bug) {
                return res.status(500).json({ reqStatus: false, data: "Bug is already deleted." });
            }
            const user = await findUserById(_id)
            try {
                const payload = {
                    activityType: "reOpenBug",
                    activityId: bug._id,
                    avatar: user.avatar,
                    activity: {
                        title: bug.Name,
                        body: `@${bug.ReporterName} reopen a bug in the ${bug.ProjectName} project.`
                    },
                    isResolve: {
                        flag: false,
                        bugId: bug._id
                    },
                    link: `/bug/${bug.ProjectId}/${bug._id}`
                }
                await createNewActivity(payload)
            }
            catch (e) {
                return res.status(500).json({ reqStatus: false, data: "Error while creating timeline." });
            }
            return res.json({
                reqStatus: true, data: bug 
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while updating bug." });
        }
    }
}

export default new BugsController()