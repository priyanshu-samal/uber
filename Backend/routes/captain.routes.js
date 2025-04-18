const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('at least 6 characters long'),
    body('vechicle.color').isLength({ min: 3 }).withMessage('at least 3 characters long'),
    body('vechicle.plate').isLength({ min: 3 }).withMessage('at least 3 characters long'),
    body('vechicle.capacity').isNumeric().withMessage('capacity must be a number'),
    body('vechicle.vechicleType').isLength({ min: 3 }).withMessage('at least 3 characters long')
],
  captainController.registerCaptain
);



module.exports = router;