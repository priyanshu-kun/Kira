import mongoose from "mongoose";

const timelineSchema = mongoose.Schema({
    activityType: {
        type: String,
        enum: [
            "newUserCreated",
            "userUpdated",
            "deleteAccount",
            "newProjectCreated",
            "deleteProject",
            "newBugCreated",
            "bugUpdated",
            "deleteBug",
            "resolveBug",
            "reOpenBug",
            "comment",
            "reply"
        ],
        required: true
    },
    activityId: { type: mongoose.Types.ObjectId, required: true },
    avatar: { type: String, required: true },
    time: {
        type: Date,
        default: Date.now,
    },
    activity: { 
        title: {type: String, required: true},
        body: {type: String, required: true}
    },
    isResolve: {
        flag: {
            type: Boolean,
            default: false,
        },
        bugId: {
            type: mongoose.Types.ObjectId,
        }
    },
    link: { type: String }
})


export default mongoose.model("Timeline", timelineSchema, "timeline")