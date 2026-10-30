// Cloudinary package ko import kar rahe hain
const cloudinary = require('cloudinary').v2;

// .env file se environment variables load kar rahe hain
require('dotenv').config();

// Cloudinary account ki configuration set kar rahe hain
cloudinary.config({

    // Cloudinary account ka name
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    // Cloudinary API key
    api_key: process.env.CLOUDINARY_API_KEY,

    // Cloudinary API secret (private rakhna hai)
    api_secret: process.env.CLOUDINARY_API_SECRET

});

// Cloudinary configuration ko doosri files mein use karne ke liye export kar rahe hain
module.exports = cloudinary;


// .v2 kyu use karte hain?
// Cloudinary ke Node.js SDK mein v2 interface available hai. Hum uske methods aur configuration ko use karne ke liye .v2 likhte hain.