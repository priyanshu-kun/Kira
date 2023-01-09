import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    tags: [String],
    users: [String],
    owner: {type: mongoose.Schema.Types.ObjectId, required: true,ref: "User"},
    projectLead: {type: String, required: true}
})


export default mongoose.model("Project",projectSchema,"project")