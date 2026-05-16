const Comment = require('../models/Comment');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');


exports.addComment = async (req, res) => {
    try{

        const {body, parent} = req.body;
        const issueId = req.params.issueId;

        const memberUser = await User.findOne({
            role : 'member'
        });

        if(!memberUser){
            return res.status(404).json({
                success: false,
                message: 'Member user not found'
            });
        }

        const comment = await Comment.create({
            body,
            issue: issueId,
            author: memberUser._id,
            parent
        });
        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.getComments = async(req,res) => {
    try{

        const comments = await Comment.find({
            issue: req.params.issueId
        })
        .sort({createdAt: 1 })
        .populate('author' , 'name');

        res.status(200).json({
            success: true,
            comments
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.updateComment = async(req,res) => {
    try{

        const{body} = req.body;

        const comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        comment.body = body;
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            comment
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




exports.deleteComment = async(req,res) => {
    try{

        const deletedComment = await Comment.findByIdAndDelete(
            req.params.id
        );
        if(!deletedComment){
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        res.status(204).send();

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};