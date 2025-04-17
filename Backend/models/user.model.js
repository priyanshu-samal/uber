const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'atleast 3 character long']
        },
        lastname:{
            type:String,
            minlength:[3,'atleast 3 character long']
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message:'Please enter a valid email address'
        }
    },
    password:{
        type:String,
        required:true,
        
    },
    socketId:{
        type:String,
        default:null
    }

})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const userModel=mongoose.model('User',userSchema);
module.exports=userModel;