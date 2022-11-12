import mongoose, {Schema,model} from "mongoose";

const projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    tags: [String],
    users: [mongoose.Schema.Types.ObjectId],
    projectLead: {type: String, required: true}
})


export default mongoose.model("Project",projectSchema,"project")