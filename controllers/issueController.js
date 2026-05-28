const Issue = require('../models/Issue');
const ActivityLog = require('../models/ActivityLog');
const { applyPagination , buildPaginationMeta } = require('../utils/queryHelper');

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

   

    const issue = await Issue.create({
        title,
        description,
        type,
        priority,
        project,
        reporter: req.user.id,
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
    
    const filter = {};

    if (req.query.project) {
        filter.project = req.query.project;
    }

    if (req.query.status) {
        filter.status = req.query.status;
    }

    if (req.query.priority) {
        filter.priority = req.query.priority;
    }

    if (req.query.type) {
        filter.type = req.query.type;
    }

    if (req.query.assignee) {
        filter.assignee = req.query.assignee;
    }

    if (req.query.search) {

         filter.$text = {
           $search: req.query.search
         };
    }

    let sort = {
    createdAt: -1
};


if (req.query.sortBy) {

    const [field, order] =
        req.query.sortBy.split('_');

    sort = {
        [field]:
            order === 'asc'
                ? 1
                : -1
    };
}

let query =  Issue.find(filter)
        .select(
        'title type status priority reporter assignee createdAt'
        )
        .sort(sort)
        .populate('reporter', 'name email')
        .populate('assignee', 'name email')
        .populate('labels', 'name')
        .lean();

    query = applyPagination(
        query,
        req.query
    );

    const issues = await query;

    const totalCount = await Issue.countDocuments(filter);
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    if (limit > 100) {
        limit = 100;
    }
    const pagination = buildPaginationMeta(
            totalCount,
            page,
            limit
        );



    res.status(200).json({
        success: true,
        pagination,
        count: issues.length,
        data: issues
    });
});



exports.getIssueById = catchAsync(async (req, res, next) => {

    const issue = await Issue.findById(req.params.id)
        .populate('reporter', 'name email')
        .populate('assignee', 'name email')
        .populate('project', 'title description status')
        .populate('labels', 'name')
        .lean();

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

    const issue = await Issue.findById(
        req.params.id
    );

    if (!issue) {
        return next(new AppError('Issue not found', 404));
    }

    if(issue.reporter.toString() !== req.user.id.toString()){
        return next(
            new AppError(
                'You can only delete issues you reported',
                403
            )
        );
    }

    await issue.deleteOne();

    res.status(204).send();
});



exports.updateIssueStatus = catchAsync(async (req, res, next) => {

    const { status } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return next(new AppError('Issue not found', 404));
    }

    if(issue.reporter.toString() !== req.user.id.toString() && (!issue.assignee || issue.assignee.toString() !== req.user.id.toString())){
        return next(
            new AppError(
                'Only the reporter or assignee can update the issue status',
                403
            )
        );
    }

    const previousStatus = issue.status;

    issue.status = status;

    await issue.save();

    

    const activityLog = await ActivityLog.create({
        issue: issue._id,
        actor: req.user.id,
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

   

    const activityLog = await ActivityLog.create({
        issue: issue._id,
        actor: req.user.id,
        action: 'assigned',
        beforeValue: previousAssignee,
        afterValue: assigneeId.toString()
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
    .populate('actor', 'name')
    .lean();

    res.status(200).json({
        success: true,
        activities
    });
});