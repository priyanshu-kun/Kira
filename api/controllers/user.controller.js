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
    async verifyOTP(req,res) {
        const { otp, hash, Email } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired!' });
        }

        // const data = `${phone}.${otp}.${expires}`;
        // const isValid = otpService.verifyOtp(hashedOtp, data);
        // if (!isValid) {
        //     res.status(400).json({ message: 'Invalid OTP' });
        // }

        // let user;
        // try {
        //     user = await userService.findUser({ phone });
        //     if (!user) {
        //         user = await userService.createUser({ phone });
        //     }
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json({ message: 'Db error' });
        // }

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


module.exports = new AuthController()