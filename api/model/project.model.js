import mongoose, {Schema,model, mongo} from "mongoose";

const projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    tags: [String],
    users: [mongoose.Schema.Types.ObjectId],
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    projectLead: {type: String, required: true}
})


export default mongoose.model("Project",projectSchema,"project")