import jwt from "jsonwebtoken"
import refreshModel from "../model/refresh.model.js";
class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: "1y"
        })
        return { accessToken, refreshToken }
    }
    async verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    }
    async storeRefreshToken(token,userId) {
        await refreshModel.create({token,userId})
    }
    async verifyRefreshToken(token) {
        return await jwt.verify(token,process.env.JWT_REFRESH_TOKEN_SECRET)
    }
    async findRefreshTokenInDB(id,token) {
        return await refreshModel.findOne({userId: id,token})
    }
    async updateRefreshToken(id,token) {
        return await refreshModel.updateOne({userId: id},{token})
    }
    async removeRefreshToken(token) {
        return await refreshModel.deleteOne({token})
    }
}

export default new TokenService()