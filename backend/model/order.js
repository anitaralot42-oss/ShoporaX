
// Mongoose package import kar rahe hain
// Mongoose MongoDB mein data create aur manage karne mein help karta hai
const mongoose = require('mongoose');

// Order ka schema create kar rahe hain
// Schema define karta hai ki Order document mein kaun-kaun se fields honge
const orderSchema = new mongoose.Schema({

    // User field: jis customer ne order place kiya hai uski ID store hogi
    user: {
        // ObjectId ka matlab User ki unique MongoDB ID store hogi
        type: mongoose.Schema.Types.ObjectId,

        // User model ko refer kar rahe hain
        // Isse hum baad mein populate() se user ki details nikal sakte hain
        ref: 'User',

        // User ID dena compulsory hai
        required: true
    },

    // Products ek array hai kyunki ek order mein multiple products ho sakte hain
    products: [
        {
            // Product field mein product ki unique ID store hogi
            product: {
                // Product ki MongoDB ObjectId store hogi
                type: mongoose.Schema.Types.ObjectId,

                // Product model ko refer kar rahe hain
                ref: 'Product',

                // Product ID compulsory hai
                required: true
            },

            // Customer ne product ki kitni quantity order ki hai
            quantity: {
                // Quantity number mein store hogi
                type: Number,

                // Quantity dena compulsory hai
                // required: true,

                // Minimum quantity 1 honi chahiye
                min: 1
            },

            price :{
                type : Number,
                // required : true
            }
        }
    ],

    // Customer ke poore order ka total amount store hoga
    totalAmount: {
        // Amount number format mein store hoga
        type: Number,

        // Total amount dena compulsory hai
        // required: true
    },

    // Customer ka delivery address store hoga
    address: {

        // Customer ka full name
        fullName: {
            type: String,
            // required: true
        },

        // Customer ka house number ya street address
        street: {
            type: String,
            // required: true
        },

        // Customer ka city name
        city: {
            type: String,
            // required: true
        },

        // Customer ka postal / PIN code
        postalCode: {
            type: String,
            // required: true
        },

        // Customer ka country name
        country: {
            type: String,
            // required: true
        }
    },

    // Payment gateway se milne wali payment ID store hogi
    paymentId: {
        // Payment ID string format mein hogi
        type: String,
    },

    // Order ka current status store hoga
    orderStatus: {
        // Status string format mein store hoga
        type: String,
        enum :['pending', 'shipped', 'delivered'],

        // Default status Pending rahega
        default: 'pending'
    }

}, {
    // Order create hone aur update hone ka time automatically save hoga
    timestamps: true
});

// Order model create kar rahe hain
// 'Order' model MongoDB mein orders collection ko manage karega
const Order = mongoose.model('Order', orderSchema);

// Order model ko export kar rahe hain
// Taaki controller mein require() karke use kar sakein
module.exports = Order;
