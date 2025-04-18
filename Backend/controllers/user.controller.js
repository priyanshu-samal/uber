const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


// Register User
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, lastname, email, password } = req.body;

    const isuserAlreadyExist = await userModel.findOne({ email });
    if (isuserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }   
    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = await user.generateAuthToken();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        next(error);
    }
};

// Login User
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        //  Use instance method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = await user.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        next(error);
    }
};

// Get User Profile
module.exports.getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user: req.user
        });
    } catch (error) {
        next(error);
    }
};

module.exports.logoutUser = async (req, res, next) => { 
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({
        token: token,
        
    });
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
}