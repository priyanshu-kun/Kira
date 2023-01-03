import mongoose from "mongoose"

const passwordSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    token: String,
    expired: Date
})


export default mongoose.model('ForgotPassword',passwordSchema,'forgotPassword')