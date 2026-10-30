// Middleware to check whether the logged-in user is an Admin or not

const admin = (req, res, next) => {

    // Check karo ki user logged-in hai aur uska role 'admin' hai
    if (req.user && req.user.role === 'admin') {

        // Agar user Admin hai toh next middleware ya controller par bhej do
        next();

    } else {

        // Agar user Admin nahi hai toh access deny kar do
        // 403 = Forbidden (User ke paas permission nahi hai)
        res.status(403).json({
            message: 'Access denied, admin only'
        });
    }
};

// Export admin middleware so that we can use it in routes
module.exports = { admin };