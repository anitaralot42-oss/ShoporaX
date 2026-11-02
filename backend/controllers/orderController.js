// Order model import kar rahe hain
const Order = require("../model/order");

// Email send karne wala function import kar rahe hain
const sendEmail = require("../utlis/SendEmail");

// Naya order create karne ke liye function
const createOrder = async (req, res) => {
  try {
    // Frontend/Postman se order ki details receive kar rahe hain
    const { products, totalAmount, address, paymentId } = req.body;

    // Check karenge ki required details aayi hain ya nahi
    if (!products || products.length === 0 || !totalAmount || !address) {
      // Agar details missing hain toh 400 error bhejenge
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    // Order model ki help se naya order create aur MongoDB mein save karenge
    const order = await Order.create({
      // Login customer ki ID store karenge
      user: req.user._id,

      // Customer ne jo products order kiye hain
      products,

      // Order ka total amount
      totalAmount,

      // Customer ka delivery address
      address,

      // Payment gateway se mili payment ID
      paymentId,
    });

    // Customer ke liye confirmation email ka message banayenge
    const message = `Dear ${req.user.name},Thank you for your order!Your order has been successfully created.
        Order ID: ${order._id}Total Amount: ₹${totalAmount}

Shipping Address:
${address.fullName}
${address.street}
${address.city}
${address.postalCode}
${address.country}

We will notify you once your order is shipped.

Best regards,
ShoporaX Team`;

    // Customer ko order confirmation email send karenge
    await sendEmail(
      req.user.email, // Customer ka email address
      "Order Created", // Email ka subject
      message, // Email ka actual content
    );

    // Successfully order create hone par response bhejenge
    res.status(201).json({message: "Order created successfully",order,});
  } 

  catch (error) {
    // Agar koi error aata hai toh server error response bhejenge
    console.log(error);

    res.status(500).json({message: "Error creating order",error: error.message, });

  }
};

const getAllOrder = async (req, res) => {
    try {
       const orders = await Order.find({}).populate('user', 'name email');

        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders',error});
    }

};


const getOrderById = async (req, res) => {
    try {
        // URL se Order ki ID lekar database mein search karega
        const orders = await Order.findById(req.params.id);

        // Agar Order mil jata hai
        if (orders) {
            res.json(orders);
        }
        // Agar Order nahi milta
        else {
            res.status(404).json({ message: "Order Not Found" });
        }
    }
    catch (error) {
        // Agar server ya database mein error aata hai
        res.status(500).json({ message: "Server error" });
    }
};


// Order ka status update karne ke liye function
const updateOrderStatus = async (req, res) => {
    try {
        // Postman se new status receive kar rahe hain
        const { status } = req.body;

        // URL se Order ID lekar database mein order find kar rahe hain
        const order = await Order.findById(req.params.id);
       
        // Check kar rahe hain ki order mila ya nahi
        if (order) {

            // Order ka existing status update kar rahe hain
            order.orderStatus = status;

            // Updated order ko database mein save kar rahe hain
            await order.save();

            // Success response bhej rahe hain
            res.json({
                message: 'Order status updated',
                order
            });
        }

        // Agar order nahi mila toh
        else {
            res.status(404).json({
                message: 'Order not found'
            });
        }
    }

    // Agar koi error aata hai toh
    catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error
        });
    }
};


// Controller function ko export kar rahe hain
// Taaki routes mein use kar sakein
module.exports = { createOrder, getAllOrder,getOrderById,updateOrderStatus};
