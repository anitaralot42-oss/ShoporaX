// jsonwebtoken package ko import kiya
// Iska use JWT token ko verify karne ke liye hoga
const jwt = require('jsonwebtoken');

// User model ko import kiya
// Iski help se hum database mein user ko search karenge
const User = require('../model/UserSchema');


// protect naam ka middleware function banaya
// Iska kaam check karna hai ki request bhejne wala user valid hai ya nahi
const protect = async (req, res, next) => {

    // Ek token naam ka variable banaya
    // Ismein hum frontend se aane wala JWT token store karenge
    let token;


    // req.headers.authorization se Authorization header ki value milegi
    // && ka matlab hai ki dono conditions true honi chahiye
    // startsWith('Bearer') check karta hai ki value Bearer se start hoti hai ya nahi
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {

        // try ke andar woh code likhte hain jisme error aa sakta hai
        try {

            // Authorization header ki value ko space ke basis par split kiya
            // Example: 'Bearer abc123' -> ['Bearer', 'abc123']
            // [1] se second value, yani actual token, nikala
            token = req.headers.authorization.split(' ')[1];


            // JWT_SECRET ki help se token verify kiya
            // Agar token valid hai, toh uske andar ki information decoded mein milegi
            // decoded.id mein user ki ID hoti hai, agar token banate waqt ID save ki thi
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            // decoded.id ki help se database mein user ko find kiya
            // await database se result aane ka wait karta hai
            // select('-password') result se password field ko exclude karta hai
            // Mile hue user ko req.user mein store kiya, taaki agla controller use kar sake
            req.user = await User.findById(decoded.id).select('-password');


            // Check kiya ki database mein user mila ya nahi
            // !req.user ka matlab hai ki user nahi mila
            if (!req.user) {

                // 401 ka matlab Unauthorized hai
                // Frontend ko message bhejkar function yahin rok diya
                return res.status(401).json({
                    message: 'User not found'
                });
            }


            // Token valid hai aur user mil gaya
            // Isliye request ko agle middleware ya controller tak bhejo
            return next();


        // Agar try ke andar koi error aata hai, toh catch chalega
        } catch (error) {

            // Invalid/expired token ya doosri verification error ko handle kiya
            // Frontend ko 401 Unauthorized response bheja
            return res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    }


    // Agar token variable mein value nahi aayi, toh ye condition chalegi
    // !token ka matlab hai token ki value missing hai
    if (!token) {

        // Frontend ko bataya ki token nahi mila
        // return response bhejkar function ko yahin rok deta hai
        return res.status(401).json({
            message: 'Not authorized, no token'
        });
    }
};


// protect middleware ko doosri files mein import karne ke liye export kiya
module.exports = { protect };