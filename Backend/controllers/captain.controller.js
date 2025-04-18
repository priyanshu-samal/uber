const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

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
