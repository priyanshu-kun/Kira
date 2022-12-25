import userModel from "../model/user.model.js"

class UserService {
    async findUserByEmail(email) {
        return await userModel.findOne(email)
    }
    async createUser(user) {
        return await userModel.create(user)
    }
    async ActivateUser(key,user) {
        return await userModel.findOneAndUpdate({email: {$eq: key}},{$set: {username: user.username,password: user.password,fullName: user.fullName, avatar: user.avatar, activated: user.activated}},{returnDocument: "after"})
    }
    async findUserByUsernameAndEmail(key) {
       return await userModel.findOne({$or: [{email: key},{username: key}]}); 
    }
    async findUserById(id) {
        return await userModel.findById(id)
    }
    async findUserByUsername(username) {
        return await userModel.findOne({username})
    }
    async findAllUsers() {
        return await userModel.find();
    }
}

export default new UserService()