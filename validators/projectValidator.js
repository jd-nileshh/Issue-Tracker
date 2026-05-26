const{ body } = require('express-validator');

exports.createProjectRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')

        .isLength({min:3 , max:100})
        .withMessage('Tiltle must be between 3 and 100 characters')
];


exports.updateProjectRules = [
    body('title')
        .optional()

        .isLength({min:3 , max:100})
        .withMessage('Tiltle must be between 3 and 100 characters'),

    body('status')
        .optional()

        .isIn(['active','archived'])
        .withMessage('Invalid project status')

];