const{ body } = require('express-validator');

exports.createCommentRules = [
    body('body')
        .notEmpty()
        .withMessage('Body is required')

        .isLength({min:1 , max:2000})
        .withMessage('Body must be between 1 and 2000 characters'),

    body('parent')
        .optional()

        .isMongoId()
        .withMessage('Invalid parent comment ID')
];