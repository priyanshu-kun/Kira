const crypto = require("crypto")
class HashService {
   hashOTP(hash) {
       return crypto.createHmac('sha256','somesecret').update(hash).digest('hex') 
   } 
}

module.exports = new HashService()