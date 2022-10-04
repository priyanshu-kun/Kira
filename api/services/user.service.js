import userModel from "../model/user.model.js"

class userService {
    async findUserByEmail(email) {
        return await userModel.findOne(email)
    }
    async createUser(user) {
        return await userModel.create(user)
    }
}

export default userService