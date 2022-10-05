import userModel from "../model/user.model.js"

class UserService {
    async findUserByEmail(email) {
        return await userModel.findOne(email)
    }
    async createUser(user) {
        return await userModel.create(user)
    }
    async ActivateUser(key,user) {
        console.log(key)
        return await userModel.findOneAndUpdate({email: {$eq: key}},{$set: {username: user.username,password: user.password,fullName: user.fullName}},{returnDocument: "after"})
    }
}

export default new UserService()