// Database ke models import kar rahe hain
const Order = require('../model/order');
const User = require('../model/UserSchema');
const Product = require('../model/product');

// Admin dashboard ke statistics nikalne ke liye function
const getAdminStates = async (req, res) => {
    try {

        // Database mein jitne normal users (customers) hain unko count karo
        const totalUsers = await User.countDocuments({ role: 'user' });

        // Database mein total kitne orders hain unko count karo
        const totalOrders = await Order.countDocuments({});

        // Database mein total kitne products hain unko count karo
        const totalProducts = await Product.countDocuments({});

        // Database se saare orders fetch karo
        const orders = await Order.find({});

        // Sabhi orders ke totalAmount ko add karke total revenue calculate karo
        // acc = ab tak ka total amount
        // order = current order
        // 0 = starting value
        const totalRevenueData = orders.reduce(
            (acc, order) => acc + order.totalAmount,
            0
        );

        // Calculated statistics ko frontend par JSON response mein bhejo
        res.json({
            totalUsers,                  // Total registered customers
            totalOrders,                 // Total orders
            totalProducts,               // Total products
            totalRevenue: totalRevenueData // Total sales revenue
        });

    } catch (error) {

        // Agar database query ya calculation mein error aaye toh error response bhejo
        res.status(500).json({message: "Error fetching admin stats",error: error.message});
    }
};

// Function ko export kar rahe hain taaki routes mein use kar sakein
module.exports = { getAdminStates };