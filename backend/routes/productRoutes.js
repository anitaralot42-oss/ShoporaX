const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware") 
const {admin} = require("../middleware/adminMiddlware")
const {createProduct} = require("../controllers/productController")

router.get("/product",getProducts);
router.post("/product",protect, admin, createProduct);
router.get("/product/:id",getProductById);
router.put("/update/:id", protect, admin, updateProduct);
router.delete("/delete/:id",protect, admin, deleteProduct);



module.exports = router;


