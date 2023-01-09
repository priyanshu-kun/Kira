import express from "express"
import projectController from "./controllers/project.controller.js";
const router = express.Router()
import authController from "./controllers/user.controller.js"
import authMiddleware from "./middleware/auth.middleware.js";
import bugsController from "./controllers/bugs.controller.js";
import timelineController from "./controllers/timeline.controller.js";
import commentController from "./controllers/comment.controller.js";

router.post('/api/send-otp',authController.sendOTP);
router.post('/api/verify-otp',authController.verifyOTP);
router.post('/api/create-account',authController.createAccount); // timeline
router.post('/api/login-user',authController.loginUser);
router.get('/api/user',authMiddleware ,authController.getUser);
router.get('/api/refresh',authController.refresh);
router.patch('/api/update-user/:id',authMiddleware,authController.updateUser); // timeline
router.post('/api/show-password/:id',authMiddleware,authController.showPassword)
router.delete('/api/delete-account/:id',authMiddleware,authController.deleteAccount); // timeline
router.post('/api/logout-user',authMiddleware,authController.logOutUser);
router.post('/api/troubleShoot-account',authController.troubleShootAccount)
router.post('/api/forgot-password/:id',authController.forgotPassword)
router.post('/api/create-project',authMiddleware, projectController.createProject) // timeline
router.get('/api/fetch/user/projects',authMiddleware, projectController.fetchUserProjects)
router.get('/api/fetch/user/project/details',authMiddleware, projectController.fetchProjectDetails)
router.delete('/api/user/remove-project',authMiddleware, projectController.removeProject) // timeline
router.get('/api/invite/user/project/:id',projectController.saveUserInProject)
router.post('/api/fetch/user/project/send-invite',authMiddleware,projectController.sendInvite)
router.get('/api/fetch-all-users',authMiddleware,authController.findUsers)
router.post('/api/create-bug',authMiddleware,bugsController.createNewBug) // timeline
router.get('/api/fetch-all-bugs/:id',authMiddleware,bugsController.fetchRelatedToAProject)
router.get('/api/fetch-details/:id',bugsController.fetchBugDetails)
router.delete('/api/remove-bug/:id',authMiddleware,bugsController.removeBugFromProject) // timeline
router.patch('/api/update-bug/:id',authMiddleware,bugsController.updateBug) // timeline
router.get('/api/resolve-bug/:id',authMiddleware,bugsController.resolveBug) // timeline
router.get('/api/unresolve-bug/:id/:activityId',authMiddleware,bugsController.unResolve) // timeline
router.get('/api/fetch-timeline-activites',authMiddleware,timelineController.fetchAllActivites)
router.post("/api/save-comment",authMiddleware,commentController.saveComment)
router.get("/api/get-comments/:id",commentController.getComments)
export default  router