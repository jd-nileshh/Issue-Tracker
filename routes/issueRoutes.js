const express = require('express');
const router = express.Router();

router.get('/' , (req,res)=> {
    res.send('Get all issues');
});

router.post('/' , (req,res) => {
    res.send('Create issue');
});

router.get('/:id', (req,res) => {
    res.send('Get issue by id');
});

router.patch('/:id', (req,res) => {
    res.send('Update issue');
});

router.delete('/:id',(req,res) => {
    res.send('Delete issue');
});

router.patch('/:id/assign' , (req,res) => {
    res.send('Assign issue');
});

router.patch('/:id/status' , (req,res) => {
    res.send('Update issue status');
});

router.get('/:id/activity' , (req,res) => {
    res.send('Get issue activity');
});

module.exports = router;