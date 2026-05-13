const express = require('express');
const router = express.Router();

router.get('/' , (req,res) => {
    res.send('Get all projects');
});

router.post('/', (req,res) => {
    res.send('Create project');
});

router.get('/:id',(req,res) => {
    res.send('Get project by id');
});

router.patch('/:id',(req,res) => {
    res.send('Update project by id');
});

router.delete('/:id' , (req,res) => {
    res.send('Delete project');
});

router.post('/:id/members' , (req,res) =>{
    res.send('Add member to project');
});

router.delete('/:id/members/:userId',(req,res) =>{
    res.send('Remove member from project');
});

module.exports = router;