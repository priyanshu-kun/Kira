import crypto from "crypto"
import bcrypt from "bcrypt"
class HashService {
   async hashOTP(hash) {
       return await crypto.createHmac('sha256','somesecret').update(hash).digest('hex') 
   } 
   async hashPassword(password) {
    const round = 12;
    const salt =  await bcrypt.genSalt(round);
    return await bcrypt.hash(password,salt);
   }
   async comparePassword(hashedPassword, plainPassword) {
    return await bcrypt.compare(plainPassword,hashedPassword);
   }
}

export default new HashService()