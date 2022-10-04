import emailService from "../services/email.service.js";
import hashOtpService from "../services/hash.service.js";
import otpService from "../services/otp.service.js";
import userService from "../services/user.service.js";
const {sendMail} = emailService
const {hashOTP} = hashOtpService
const {verifyOtp,generateOTP} = otpService
const {findUserByEmail} = userService

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
            await sendMail(Email,otp)
            res.json({
                // otp,
                hash: `${hash}.${expire}`,
                Email
            })
        }
        catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async verifyOTP(req,res) {
        const { otp, hash, Email,fullName,username,avatar,password } = req.body;
        if (!otp || !hash || !Email) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${Email}.${otp}.${expires}`;
        const isValid = verifyOtp(data,hashedOtp);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await findUserByEmail({ email: Email });
            if (!user) {
                user = await userService.createUser({ email: Email,username,fullName,password });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }
        return res.json(user)
        // const { accessToken, refreshToken } = tokenService.generateTokens({
        //     _id: user._id,
        //     activated: false,
        // });

        // res.cookie('refreshToken', refreshToken, {
        //     maxAge: 1000 * 60 * 60 * 24 * 30,
        //     httpOnly: true,
        // });
        // const userDto = new UserDto(user);
        // res.json({ accessToken, user: userDto });
    }
}


export default new AuthController()