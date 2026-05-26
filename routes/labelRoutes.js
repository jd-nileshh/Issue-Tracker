const express = require('express');
const { protect } = require('../middlewares/protect');

const router = express.Router({
    mergeParams: true
});

const {
    createLabel,
    getLabels,
    updateLabel,
    deleteLabel
} = require('../controllers/labelController');


// 🔹 Get all labels for a project
router.get('/',protect, getLabels);


// 🔹 Create label
router.post('/',protect, createLabel);


// 🔹 Update label
router.patch('/:id',protect, updateLabel);


// 🔹 Delete label
router.delete('/:id',protect, deleteLabel);


module.exports = router;