
const product = require("../model/product");
const cloudinary = require("../config/cloudinary");



const getProducts = async(req,res) =>{
    try{
        const products = await Product.find({});
        res.json(products);

    }

    catch(error){
        res.status(500).json({message : "Server error"});


    }
}

const getProductById = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message : "Product Not Found"});
        }

    }

    catch(error){
        res.status(500).json({message : "Server error"})

    }

}


const createProduct = async (req, res) => {
    try {
        // Initially image URL empty rakhenge
        let imageUrl = '';

        // Check karenge ki user ne image upload ki hai ya nahi
        if (req.file) {

            // Uploaded image ko Cloudinary par upload karenge
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);

            // Cloudinary se image ka URL lekar imageUrl mein store karenge
            imageUrl = result.secure_url;
        }

        // Product create karke MongoDB mein save karenge
        const product = await Product.create({

            // Spread operator req.body ki saari properties
            // (name, description, price, category, stock) yahan copy karega
            ...req.body,

            // Cloudinary se mila image URL bhi object mein add karenge
            imageUrl
        });

        // 201 status ke saath created product response mein bhejenge
        res.status(201).json(product);

    } catch (error) {

        // Agar koi error aata hai toh 500 status ke saath error bhejenge
        res.status(500).json({
            message: error.message
        });
    }
};



const updateProduct = async (req, res) => {
    try {
        // Postman se new product details lena
        // ID ke through existing product find karna
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        if (product) {

            // New value aayi hai toh update karo, warna old value rakho
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            // Check karna ki new image upload hui hai ya nahi
            if (req.file) {

                // New image Cloudinary par upload karna
                const result = await cloudinary.uploader.upload(req.file.path);

                // Old image URL ko new image URL se replace karna
                product.imageUrl = result.secure_url;
            }

            // Updated product ko MongoDB mein save karna
            const updatedProduct = await product.save();

            // Updated product response mein bhejna
            res.json(updatedProduct);
        }
        else {
            // Agar product nahi mila toh 404 response dena
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        // Koi error aane par server error response dena
        res.status(500).json({ message: "Server error" });
    }
};

 const deleteProduct = async(req,res) =>{
 try{

      const studentDelete = await Product.findByIdAndDelete(req.params.id);
      if(studentDelete){
          res.json({message :"product deleted"});
      }
      else{
         res.json({message :"product not found"});

      }
    
}

 catch(error){
    res.status(500).json({message : "Server error"});
 }

}

 

module.exports = {createProduct,getProductById, getProducts,updateProduct,deleteProduct} ;