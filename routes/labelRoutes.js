const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/',(req,res) => {
    res.send('Get labels for projects ' + req.params.projectId);
});

router.post('/',(req,res) => {
    res.send('Create labels for projects' + req.params.projectId);
});

router.patch('/:id', (req,res) => {
    res.send('Update labels');
});

router.delete('/:id' ,(req,res) => {
    res.send('Delete labels');
});

module.exports = router;