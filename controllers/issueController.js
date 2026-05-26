const Issue = require('../models/Issue');
const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const Label = require('../models/Label');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createIssue = catchAsync(async (req, res, next) => {

    const {
        title,
        description,
        type,
        priority,
        project,
        assignee,
        labels,
        dueDate
    } = req.body;

    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
        return next(new AppError('Admin user not found', 404));
    }

    const issue = await Issue.create({
        title,
        description,
        type,
        priority,
        project,
        reporter: adminUser._id,
        assignee,
        labels,
        dueDate
    });

    res.status(201).json({
        success: true,
        message: 'Issue created successfully',
        issue
    });
});



exports.getIssues = catchAsync(async (req, res, next) => {

    const issues = await Issue.find()
        .populate('reporter', 'name email')
        .populate('assignee', 'name email')
        .populate('labels', 'name');

    res.status(200).json({
        success: true,
        issues
    });
});



exports.getIssueById = catchAsync(async (req, res, next) => {

    const issue = await Issue.findById(req.params.id)
        .populate('reporter', 'name email')
        .populate('assignee', 'name email')
        .populate('project', 'title description status')
        .populate('labels', 'name');

    if (!issue) {
        return next(new AppError('Issue not found', 404));
    }

    res.status(200).json({
        success: true,
        issue
    });
});



exports.updateIssue = catchAsync(async (req, res, next) => {

    const {
        title,
        description,
        priority,
        dueDate,
        labels
    } = req.body;

    const updateData = {};

    if (title !== undefined) {
        updateData.title = title;
    }

    if (description !== undefined) {
        updateData.description = description;
    }

    if (priority !== undefined) {
        updateData.priority = priority;
    }

    if (dueDate !== undefined) {
        updateData.dueDate = dueDate;
    }

    if (labels !== undefined) {
        updateData.labels = labels;
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedIssue) {
        return next(new AppError('Issue not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Issue updated successfully',
        issue: updatedIssue
    });
});



exports.deleteIssue = catchAsync(async (req, res, next) => {

    const deletedIssue = await Issue.findByIdAndDelete(
        req.params.id
    );

    if (!deletedIssue) {
        return next(new AppError('Issue not found', 404));
    }

    res.status(204).send();
});



exports.updateIssueStatus = catchAsync(async (req, res, next) => {

    const { status } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return next(new AppError('Issue not found', 404));
    }

    const previousStatus = issue.status;

    issue.status = status;

    await issue.save();

    const adminUser = await User.findOne({ role: 'admin' });

    const activityLog = await ActivityLog.create({
        issue: issue._id,
        actor: adminUser._id,
        action: 'status_changed',
        beforeValue: previousStatus,
        afterValue: status
    });

    res.status(200).json({
        success: true,
        message: 'Issue status updated successfully',
        issue,
        activityLog
    });
});



exports.assignIssue = catchAsync(async (req, res, next) => {

    const { assigneeId } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return next(new AppError('Issue not found', 404));
    }

    const previousAssignee = issue.assignee
        ? issue.assignee.toString()
        : 'unassigned';

    issue.assignee = assigneeId;

    await issue.save();

    const adminUser = await User.findOne({ role: 'admin' });

    const activityLog = await ActivityLog.create({
        issue: issue._id,
        actor: adminUser._id,
        action: 'assigned',
        beforeValue: previousAssignee,
        afterValue: assigneeId
    });

    res.status(200).json({
        success: true,
        message: 'Issue assigned successfully',
        issue,
        activityLog
    });
});



exports.getIssueActivity = catchAsync(async (req, res, next) => {

    const activities = await ActivityLog.find({
        issue: req.params.id
    })
    .sort({ createdAt: -1 })
    .populate('actor', 'name');

    res.status(200).json({
        success: true,
        activities
    });
});