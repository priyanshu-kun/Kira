import crypto  from "crypto";
import hashService from "./hash.service.js";
const {hashOTP} = hashService


class OTPService {
    generateOTP() {
        return crypto.randomInt(100000,999999)
    }
    verifyOtp(data,hashedOtp) {
       const computedHash = hashOTP(data) 
       return computedHash === hashedOtp;
    }
}

export default new OTPService()