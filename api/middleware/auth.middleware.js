import tokenService from '../services/token.service.js';
const {verifyAccessToken} = tokenService

export default async function (req, res, next) {
    try {
        const { accessToken } = req.cookies;
        // console.log("accesstoken at auth.midd 7: ",accessToken)
        if (!accessToken) {
            throw new Error();
        }
        const userData = await verifyAccessToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};