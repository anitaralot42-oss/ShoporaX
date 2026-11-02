const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddlware");
const {createOrder, getAllOrder,getOrderById,updateOrder, updateOrderStatus} = require("../controllers/orderController")



router.get("/order",  protect, admin ,getAllOrder);
router.post("/order",protect, createOrder);
router.get("/myorder/:id",protect, getOrderById);
router.put("/update-order/:id", protect, admin,  updateOrderStatus);

module.exports = router;
