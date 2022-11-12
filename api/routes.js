import express from "express"
import projectController from "./controllers/project.controller.js";
const router = express.Router()
import authController from "./controllers/user.controller.js"
import authMiddleware from "./middleware/auth.middleware.js";


router.post('/api/send-otp',authController.sendOTP);
router.post('/api/verify-otp',authController.verifyOTP);
router.post('/api/create-account',authController.createAccount);
router.post('/api/login-user',authController.loginUser);
router.get('/api/user',authMiddleware ,authController.getUser);
router.get('/api/refresh',authController.refresh);
router.post('/api/logout-user',authMiddleware,authController.logOutUser);
router.post('/api/create-project',authMiddleware, projectController.createProject)

export default  router