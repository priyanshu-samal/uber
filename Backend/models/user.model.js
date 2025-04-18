const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default: null
    }
});

// 🔐 Token generation instance method
userSchema.methods.generateAuthToken = async function () {
    
    const token = jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

// 🔐 Password comparison instance method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 🔐 Password hashing static method
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
