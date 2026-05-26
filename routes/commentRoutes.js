const express = require('express');
const {protect} = require('../middlewares/protect');


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
router.get('/',protect, getComments);


// 🔹 Add comment to issue
router.post('/',protect, createCommentRules, validate, addComment);


// 🔹 Update comment
router.patch('/:id',protect, updateComment);


// 🔹 Delete comment
router.delete('/:id',protect, deleteComment);


module.exports = router;