const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middleware/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email '),
    body('fullname.firstname').isLength({min:3}).withMessage('atleast 3 character long'),
    body('fullname.lastname').isLength({min:3}).withMessage('atleast 3 character long'),
    body('password').isLength({min:6}).withMessage('atleast 6 character long')
],
userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email '),
    body('password').isLength({min:6}).withMessage('atleast 6 character long')
],

userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);



module.exports=router;