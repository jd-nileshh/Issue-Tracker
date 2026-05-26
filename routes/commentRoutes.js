const express = require('express');

const router = express.Router({
    mergeParams: true
});

const {
    addComment,
    getComments,
    updateComment,
    deleteComment
} = require('../controllers/commentController');

const {
    createCommentRules
} = require('../validators/commentValidator');

const { validate } = require('../middlewares/validate');


// 🔹 Get all comments for an issue
router.get('/', getComments);


// 🔹 Add comment to issue
router.post('/', createCommentRules, validate, addComment);


// 🔹 Update comment
router.patch('/:id', updateComment);


// 🔹 Delete comment
router.delete('/:id', deleteComment);


module.exports = router;