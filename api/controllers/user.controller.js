const { sendMail } = require("../services/email.service");
const { hashOTP } = require("../services/hash.service");
const { generateOTP } = require("../services/otp.service");

class AuthController {
    async sendOTP(req,res) {
        const {Email} = req.body;
        if(!Email) {
            // handle error
            res.sendStatus(500)
        }
        const otp = await generateOTP();
        const ttl = 1000 * 60 * 5;
        const expire = Date.now()+ttl;
        const data = `${Email}.${otp}.${expire}`
        const hash = await hashOTP(data)
        try {
            // await sendMail(Email,otp)
            res.json({
                otp,
                hash: `${hash}.${expire}`,
                Email
            })
        }
        catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}


module.exports = new AuthController()