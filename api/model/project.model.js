import mongoose, {Schema,model} from "mongoose";

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    tags: [String],
    users: [mongoose.Schema.Types.ObjectId],
    owner: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true}
})


export default mongoose.model("Project",projectSchema,"project")