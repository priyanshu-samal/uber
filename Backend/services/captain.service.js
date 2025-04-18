const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    fullname,
    email,
    password,
    vechicle,
    location
}) => {
    const { firstname, lastname } = fullname || {};
    const { color, plate, capacity, vechicleType } = vechicle || {};

    if (
        !firstname || !lastname || !email || !password ||
        !color || !plate || capacity === undefined || !vechicleType
    ) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vechicle: {
            color,
            plate,
            capacity,
            vechicleType
        },
        location
    });

    return captain;
};
