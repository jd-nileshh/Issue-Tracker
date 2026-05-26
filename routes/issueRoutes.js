const express = require('express');
const router = express.Router();
const{ protect } = require('../middlewares/protect');

const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
    assignIssue,
    updateIssueStatus,
    getIssueActivity
} = require('../controllers/issueController');


const {
    createIssueRules,
    updateStatusRules
} = require('../validators/issueValidator');

const { validate } = require('../middlewares/validate');


// 🔹 Get all issues
router.get('/',protect, getIssues);


// 🔹 Create new issue
router.post('/',protect, createIssueRules , validate , createIssue);


// 🔹 Get issue by ID
router.get('/:id',protect, getIssueById);


// 🔹 Update issue
router.patch('/:id',protect, updateIssue);


// 🔹 Delete issue
router.delete('/:id',protect, deleteIssue);


// 🔹 Assign issue
router.patch('/:id/assign',protect, assignIssue);


// 🔹 Update issue status
router.patch('/:id/status',protect, updateStatusRules, validate, updateIssueStatus);


// 🔹 Get issue activity logs
router.get('/:id/activity',protect, getIssueActivity);


module.exports = router;