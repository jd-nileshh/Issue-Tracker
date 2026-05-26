const{ body } = require('express-validator');

exports.createIssueRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')

        .isLength({min : 3 , max:200})
        .withMessage('Title must be between 3 and 200 characters'),


    body('type')
        .notEmpty()
        .withMessage('Type is required')

        .isIn(['bug' , 'feature' , 'task' , 'improvement'])
        .withMessage('Invalid issue type'),


    body('priority')
        .optional()

        .isIn(['critical','high','medium','low'])
        .withMessage('Invalid priority value'),

    body('project')
        .notEmpty()
        .withMessage('Project is required')

        .isMongoId()
        .withMessage('Invalid project ID'),

    body('assignee')
        .optional()

        .isMongoId()
        .withMessage('Invalid assignee ID'),

    body('dueDate')
        .optional()
        
        .isISO8601()
        .withMessage('Invalid due date format')

];


exports.updateStatusRules =[
    body('status')
        .notEmpty()
        .withMessage('Status is required')

        .isIn(['open' , 'in-review' , 'in-progress' , 'resolved' , 'closed'])
        .withMessage('Invalid issue status')
];