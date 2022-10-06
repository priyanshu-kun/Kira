import express from "express"
const router = express.Router()
import authController from "./controllers/user.controller.js"


router.post('/api/send-otp',authController.sendOTP);
router.post('/api/verify-otp',authController.verifyOTP);
router.post('/api/create-account',authController.createAccount);

export default  router