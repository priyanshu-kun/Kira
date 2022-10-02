const router = require("express").Router()
const authController = require("./controllers/user.controller")


router.post('/api/send-otp',authController.sendOTP);
router.post('/api/verify-otp',authController.verifyOTP);

module.exports = router