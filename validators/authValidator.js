const{ body } = require('express-validator');

exports.registerRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')

        .isLength({min:2 , max:60})
        .withMessage('Name must be between 2 and 60 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')

        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')

        .isLength({ min : 8})
        .withMessage('Password must be atleast 8 characters long')

        .matches(/[A-Z]/)
        .withMessage('Password must contain atleast one uppercase letter')

        .matches(/[a-z]/)
        .withMessage('Password must contain atleast one lowercase letter')

        .matches(/[0-9]/)
        .withMessage('Password must contain atleast one digit')
];



exports.loginRules = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')

        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];