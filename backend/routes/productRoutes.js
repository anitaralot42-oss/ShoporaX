const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware") 
const {admin} = require("../middleware/adminMiddlware")
const multer = require("multer");
const upload = multer({dest:'uploads/'})
const {createProduct,getProductById, getProducts,updateProduct,deleteProduct} = require("../controllers/productController")

router.get("/product",getProducts);
router.post("/product",protect, admin, upload.single('image'), createProduct);
router.get("/product/:id",getProductById);
router.put("/update/:id", protect, admin,  upload.single('image'), updateProduct);
router.delete("/delete/:id",protect, admin, deleteProduct);



module.exports = router;


