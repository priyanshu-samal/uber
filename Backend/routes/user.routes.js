const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email '),
    body('fullname.firstname').isLength({min:3}).withMessage('atleast 3 character long'),
    body('fullname.lastname').isLength({min:3}).withMessage('atleast 3 character long'),
    body('password').isLength({min:6}).withMessage('atleast 6 character long')
],
userController.registerUser
);


module.exports=router;