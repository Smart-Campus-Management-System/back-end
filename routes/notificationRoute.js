// notificationRoute.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middlewares/authMiddleware").auth; 

router.post("/",notificationController.addNotification);
router.get('/all',notificationController.getAll);
router.get("/", auth, notificationController.getNotifications);  
router.patch("/:notificationId/read", auth, notificationController.markAsRead);

module.exports = router;
