import crypto from "crypto"
class HashService {
   hashOTP(hash) {
       return crypto.createHmac('sha256','somesecret').update(hash).digest('hex') 
   } 
}

export default new HashService()