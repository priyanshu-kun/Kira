import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String,required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    activated: {type: Boolean, required: true, default: false}
},{
    timestamps: true   
})


export default  mongoose.model("User",UserSchema,"users")