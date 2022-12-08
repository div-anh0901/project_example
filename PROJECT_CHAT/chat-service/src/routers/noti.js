const express = require('express');
const router = express.Router();
const notiController = require('../controller/notificationController');
const verifyToken = require('../middleware/verifyToken');

router.post("/createNoti", notiController.createNoti);// create new noti
router.put("/addNoti", notiController.addNoti);// add element new array notis
router.get("/getNoti", verifyToken, notiController.getNotiByUserId);// get one by id
router.put("/updateStatusShow", verifyToken, notiController.updateStatuShow);// get one by id
module.exports = router;