const express = require('express');
const router = express.Router();

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
router.get('/', getIssues);


// 🔹 Create new issue
router.post('/', createIssueRules , validate , createIssue);


// 🔹 Get issue by ID
router.get('/:id', getIssueById);


// 🔹 Update issue
router.patch('/:id', updateIssue);


// 🔹 Delete issue
router.delete('/:id', deleteIssue);


// 🔹 Assign issue
router.patch('/:id/assign', assignIssue);


// 🔹 Update issue status
router.patch('/:id/status', updateStatusRules, validate, updateIssueStatus);


// 🔹 Get issue activity logs
router.get('/:id/activity', getIssueActivity);


module.exports = router;