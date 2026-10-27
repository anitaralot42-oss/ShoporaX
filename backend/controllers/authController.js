const { json } = require("express");
const User = require("../model/UserSchema");

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




    const user = User.create({ name, email, password :hashPassword});
      // otp genrate
      if(user){
        const otp = Math.floor(100000 + Math.random() * 90000).toString();

        const message = `  
        Welcome to ShoporaX , ${name}!
        Your OTP for ShoporaX registration is : ${otp}`;

        await sendEmail(email, 'welcome to ShoporaX - Your OTP  for Registration', message);

        res.status(201).json({message : 'User registrated succesfully . Please check your email for the OTP.'})



      }

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};
