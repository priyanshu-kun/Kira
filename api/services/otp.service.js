import crypto  from "crypto";
import hashService from "./hash.service.js";
const {hashOTP} = hashService


class OTPService {
    generateOTP() {
        return crypto.randomInt(100000,999999)
    }
    async verifyOtp(data,hashedOtp) {
       const computedHash = await hashOTP(data) 
       return computedHash === hashedOtp;
    }
}

export default new OTPService()