const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.addComment = catchAsync(async (req, res, next) => {

    const { body, parent } = req.body;
    const issueId = req.params.issueId;

   

    const comment = await Comment.create({
        body,
        issue: issueId,
        author: req.user.id,
        parent
    });

    res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        comment
    });
});



exports.getComments = catchAsync(async (req, res, next) => {

    const comments = await Comment.find({
        issue: req.params.issueId
    })
    .sort({ createdAt: 1 })
    .populate('author', 'name');

    res.status(200).json({
        success: true,
        comments
    });
});



exports.updateComment = catchAsync(async (req, res, next) => {

    const { body } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new AppError('Comment not found', 404));
    }

    if(comment.author.toString() !== req.user.id.toString()){
        return next(
            new AppError(
                'You can edit only your comments',
                403
            )
        );
    }

    comment.body = body;

    await comment.save();

    res.status(200).json({
        success: true,
        message: 'Comment updated successfully',
        comment
    });
});




exports.deleteComment = catchAsync(async (req, res, next) => {

    const comment = await Comment.findById(
        req.params.id
    );

    if (!comment) {
        return next(new AppError('Comment not found', 404));
    }

    if(comment.author.toString() !== req.user.id.toString()){
        return next(
            new AppError(
                'You can delete your own comments only',
                403
            )
        );
    }

    await comment.deleteOne();

    res.status(204).send();
});