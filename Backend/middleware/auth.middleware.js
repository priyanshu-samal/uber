const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistedTokenModel = require('../models/blacklistToken.model'); // Correct import name

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    // Check if the token is blacklisted
    const blacklistedToken = await blacklistedTokenModel.findOne({ token: token });
    if (blacklistedToken) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    try {
        // Verify token and get the decoded data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user from the decoded id
        const user = await userModel.findById(decoded._id);
        
        // Attach user data to the request object
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }
};
