const router = require("express").Router()
const authController = require("./controllers/user.controller")


router.post('/api/send-otp',authController.sendOTP);

module.exports = router