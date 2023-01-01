import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String,required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false},
    activated: {type: Boolean, required: true, default: false},
    isVarified: {type: Boolean, required: true, default: false},
    Bio: String,
    Banner: String
},{
    timestamps: true   
})


export default  mongoose.model("User",UserSchema,"users")