const { json } = require("express");
const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utlis/SendEmail");


// token Generate
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn : '3d'})

}


// Register a new user
const registerUser = async (req, res) => {

  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);




    const user = await User.create({ name, email, password :hashPassword});
      // otp genrate
      if(user){
        const otp = Math.floor(100000 + Math.random() * 90000).toString();

        const message = `  
        Welcome to ShoporaX , ${name}!
        Your OTP for ShoporaX registration is : ${otp}`;

        await sendEmail(email, 'welcome to ShoporaX - Your OTP  for Registration', message);

        // res.status(201).json({message : 'User registrated succesfully . Please check your email for the OTP.'})
         res.status(201).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            role: user.role,
            token: generateToken(user._id)


         })
      }

      else{
        res.status(500).json({message :"Invalid user data"});
      }



  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};


//Login user

 
const loginUser = async (req, res) => {
  // Frontend se email aur password lena
  const { email, password } = req.body;

  try {
    // Database mein email se user find karna
    const user = await User.findOne({ email });

    // User exist karta hai aur password correct hai?
    if ( user && (await bcrypt.compare(password, user.password))) {

      // Login successful: frontend ko response bhejna

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });

    }
    
    else {
      // User nahi mila ya password galat hai
      res.status(401).json({message: 'Invalid email or password'});
    }

  }catch (error) {
    // Database ya kisi operation mein error aaya
    res.status(500).json({message: 'Server error'});
  }

};


//getUser function


const getUsers = async (req, res) => {
  try {
    // Database se saare users fetch karo,
    // lekin password field exclude karo
    const users = await User.find({}).select('-password');

    // Users ka data frontend ko bhejo
    res.json(users);

  } catch (error) {
    // Agar error aaye toh response bhejo
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers
};
