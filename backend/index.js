
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db")
const userRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRotes = require("./routes/paymentRoutes")
const analyticsRoutes= require("./routes/analyticsRoutes")

connectDB();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("hello guyss");
});

app.use('/api/auth',userRoutes);
app.use('/api/product',productRoutes);
// app.use('/api/order',orderRoutes);
// app.use('/api/payment',paymentRotes);
// app.use('/analyticsRoutes',analyticsRoutes);




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
