const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddlware");
const {getAdminStates} = require("../controllers/analyticController")



router.get("/getAdmin",  protect, admin ,getAdminStates);

module.exports = router;
