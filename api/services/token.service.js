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
}

export default new TokenService()