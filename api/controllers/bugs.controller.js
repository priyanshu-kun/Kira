import Jimp from "jimp";
import bugsService from "../services/bugs.service.js";
const { createNewBug, fetchProjectBugs, fetchBugsDetails, removeBug } = bugsService;
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
                if (payloadFromClient.Attachment !== "") {
                    const matches = payloadFromClient.Attachment.match(/^data:image\/(png|jpg|jpeg|gif);base64,/);
                    let extension = "";
                    if (matches) {
                        extension = matches[1];
                    }
                    if (extension === "gif") {
                        return res.status(500).json({ reqStatus: false, data: "Error, while storing image." });
                    }
                    const buffer = Buffer.from(payloadFromClient.Attachment.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), "base64")
                    imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`
                    const jimpResp = await Jimp.read(buffer)
                    jimpResp
                        .write(path.resolve(__dirname, `../storage/${imagePath}`))
                    payloadFromClient.Attachment = `${process.env.BASE_URL}/storage/${imagePath}`;
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
}

export default new BugsController()