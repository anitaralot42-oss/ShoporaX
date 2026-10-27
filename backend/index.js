
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db")
const userRoutes = require("./routes/authRoutes")
connectDB();

const app = express();


app.get("/", (req, res) => {
    res.send("hello guyss");
});

app.use('api/auth',userRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
