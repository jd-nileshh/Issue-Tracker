const express = require('express');

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
router.get('/', getLabels);


// 🔹 Create label
router.post('/', createLabel);


// 🔹 Update label
router.patch('/:id', updateLabel);


// 🔹 Delete label
router.delete('/:id', deleteLabel);


module.exports = router;