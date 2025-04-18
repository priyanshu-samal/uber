const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
        
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vechicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, 'color name must be at least 3 characters long']

        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'plate name must be at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1']
        },
        vechicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
            
        },
    },
    location: {
       lat:{
        type: Number,

       },
       long:{
        type: Number,
       }
    },
 })


 captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
 }

    captainSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    captainSchema.statics.hashPassword = async function (password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };



const captainModel = mongoose.model('Captain', captainSchema);  
module.exports = captainModel;