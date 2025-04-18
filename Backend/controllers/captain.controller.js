const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistedTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {
        fullname: { firstname, lastname },
        email,
        password,
        vechicle: { color, plate, capacity, vechicleType },
        location
    } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    try {
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword,
            vechicle: {
                color,
                plate,
                capacity,
                vechicleType
            },
            location
        });

        const token = await captain.generateAuthToken();

        res.status(201).json({
            success: true,
            message: 'Captain registered successfully',
            token,
            captain
        });
    } catch (error) {
        next(error);
    }
};



module.exports.loginCaptain = async (req, res, next) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email });

        if (!captain) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await captain.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = await captain.generateAuthToken();

        res.status(200).json({
            success: true,
            message: 'Captain logged in successfully',
            token,
            captain
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Captain profile fetched successfully',
        captain: req.captain
    });
};


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await blacklistedTokenModel.create({ token });

    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: 'Captain logged out successfully'
    });
}