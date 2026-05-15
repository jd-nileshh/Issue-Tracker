const Issue = require('../models/Issue');
const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const Label = require('../models/Label');


exports.createIssue = async (req, res) => {
    try{
        const{
            title,
            description,
            type,
            priority,
            project,
            assignee,
            labels,
            dueDate
        } = req.body;

        const adminUser = await User.findOne({ role: 'admin'});

        if(!adminUser){
            return res.status(404).json({
                success: false,
                message:'Admin user not found'
            });
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

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.getIssues = async (req,res) => {
    try{

        const issues = await Issue.find()

        .populate('reporter', 'name email')
        .populate('assignee','name email')
        .populate('labels','name');

        res.status(200).json({
            success: true,
            issues
        });


    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.getIssueById = async(req,res) => {
    try{

        const issue = await Issue.findById(req.params.id)

        .populate('reporter','name email')
        .populate('assignee','name email')
        .populate('project' , 'title description status')
        .populate('labels','name');

        if(!issue){
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        res.status(200).json({
            success: true,
            issue
        });


    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.updateIssue = async(req,res) => {
    try{

        const{
            title,
            description,
            priority,
            dueDate,
            labels
        } = req.body;

        const updateData = {};

        if(title !== undefined){
            updateData.title = title;
        }

        if(description !== undefined){
            updateData.description = description;
        }

        if(priority !== undefined){
            updateData.priority = priority;
        }

        if(dueDate !== undefined){
            updateData.dueDate = dueDate;
        }

        if(labels !== undefined){
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
        if(!updatedIssue){
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }
        res.status(200).json({
            success:true,
            message: 'Issue updated successfully',
            issue : updatedIssue
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.deleteIssue = async (req,res) => {
    try{

        const deletedIssue = await Issue.findByIdAndDelete(
            req.params.id
        );

        if(!deletedIssue){
            return res.status(404).json({
                success: false,
                message : 'Issue not found'
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



exports.updateIssueStatus = async (req,res) => {
    try{

        const{ status } = req.body;

        const issue = await Issue.findById(req.params.id);
        if(!issue){
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }
        const previousStatus = issue.status;
        issue.status = status;

        await issue.save();

        const adminUser = await User.findOne({ role : 'admin'});

        const activityLog = await ActivityLog.create({
            issue: issue._id,
            actor: adminUser._id,
            action :'status_changed',
            beforeValue: previousStatus,
            afterValue: status
        });

        res.status(200).json({
            success: true,
            message:'Issue status updated successfully',
            issue,
            activityLog
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};



exports.assignIssue = async(req,res) => {
    try{

        const{ assigneeId } = req.body;
        const issue = await Issue.findById(req.params.id);

        if(!issue){
            return res.status(404).json({
                success: false,
                messsage: ' Issue not found'
            });
        }

        const previousAssignee = issue.ssignee
        ? issue.assignee.toString()
        : 'unassigned';

        issue.assignee = assigneeId;
        await issue.save();

        const adminUser = await User.findOne({ role : 'admin'});

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

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.getIssueActivity = async(req,res) => {
    try{
        const activities = await ActivityLog.find({
            issue: req.params.id
        })
        .sort({ createdAt: -1 })
        .populate('actor','name');

        res.status(200).json({
            success: true,
            activities
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};