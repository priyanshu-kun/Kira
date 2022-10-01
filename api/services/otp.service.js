const crypto = require("crypto")


class OTPService {
    generateOTP() {
        return crypto.randomInt(100000,999999)
    }
    verifyOTP() {

    }
}

module.exports = new OTPService()