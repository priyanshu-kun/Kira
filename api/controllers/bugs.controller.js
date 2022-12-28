import bugsService from "../services/bugs.service.js";
const {createNewBug,fetchProjectBugs} = bugsService;

class BugsController {
   async createNewBug(req,res) {
        try {
            let payloadFromClient = req.body;
            if(payloadFromClient.AssignedTo !== "") {
                payloadFromClient = {
                    ...req.body,
                    isAssigned: true
                }
            }
            const createdBug = await createNewBug(payloadFromClient)
            return res.json({
                reqStatus: true, data: createdBug
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while creating new bug." });
        }
   } 
   async fetchRelatedToAProject(req,res) {
        try {
            const {id} = req.params;
            const bugs = await fetchProjectBugs(id)
            return res.json({
                reqStatus: true, data: bugs
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while fetching bugs." });
        }
   }
}

export default new BugsController()