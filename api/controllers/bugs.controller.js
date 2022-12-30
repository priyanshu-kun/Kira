import Jimp from "jimp";
import bugsService from "../services/bugs.service.js";
const { createNewBug, fetchProjectBugs, fetchBugsDetails, removeBug,UpdateBug } = bugsService;
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

class BugsController {
    async createNewBug(req, res) {
        try {
            let imagePath;
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
            const bugs = await fetchProjectBugs(id)
            return res.json({
                reqStatus: true, data: bugs
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
            await UpdateBug(id,{isResolve: true})
            const bug = await fetchBugsDetails(id)
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