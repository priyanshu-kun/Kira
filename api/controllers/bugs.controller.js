import bugsService from "../services/bugs.service.js";
const {createNewBug} = bugsService;

class BugsController {
   async createNewBug(req,res) {
        try {
           const createdBug = await createNewBug(req.body)
            return res.json({
                reqStatus: true, data: createdBug
            })
        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while creating new user." });
        }
   } 
   async fetchRelatedToAProject(req,res) {
        try {

        }
        catch(e) {
            return res.status(500).json({ reqStatus: false, data: "Error while creating new user." });
        }
   }
}

export default new BugsController()