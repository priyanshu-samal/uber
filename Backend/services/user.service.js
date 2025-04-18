const userModel = require('../models/user.model');

// 👤 Create a new user
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password // Password should already be hashed before calling this function
    });

    return user;
};

// 📧 Find user by email
module.exports.findUserByEmail = async (email) => {
    if (!email) {
        throw new Error('Email is required');
    }

    const user = await userModel.findOne({ email });
    return user;
};
