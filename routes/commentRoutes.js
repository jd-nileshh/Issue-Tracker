const express = require('express');
const router = express.Router({mergeParams : true});

router.get('/' , (req,res) => {
    res.send('Get comments for issue ' + req.params.issueId);
});

router.post('/' , (req,res) => {
    res.send('Create comment for issue' + req.params.issueId);
});

router.patch('/:id',(req,res) => {
    res.send('Update comment');
});

router.delete('/:id' , (req,res) => {
    res.send('Delete comment');
});

module.exports = router;