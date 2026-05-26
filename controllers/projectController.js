const Project = require('../models/Project');
const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createProject = catchAsync(async (req, res, next) => {

    const { title, description } = req.body;

    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
        return next(new AppError('Admin user not found', 404));
    }

    const project = await Project.create({
        title,
        description,
        owner: adminUser._id,

        members: [
            {
                user: adminUser._id,
                role: 'owner'
            }
        ]
    });

    res.status(201).json({
        success: true,
        message: 'Project created successfully',
        project
    });
});



exports.getProjects = catchAsync(async (req, res, next) => {

    const projects = await Project.find({
        status: 'active'
    });

    res.status(200).json({
        success: true,
        projects
    });
});



exports.getProjectById = catchAsync(async (req, res, next) => {

    const project = await Project.findById(req.params.id)
        .populate('owner', 'name email');

    if (!project) {
        return next(new AppError('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        project
    });
});



exports.updateProject = catchAsync(async (req, res, next) => {

    const { title, description, status } = req.body;

    const updateData = {
        title,
        description,
        status
    };

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProject) {
        return next(new AppError('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        project: updatedProject
    });
});



exports.deleteProject = catchAsync(async (req, res, next) => {

    const deletedProject = await Project.findByIdAndDelete(
        req.params.id
    );

    if (!deletedProject) {
        return next(new AppError('Project not found', 404));
    }

    res.status(204).send();
});



exports.addMember = catchAsync(async (req, res, next) => {

    const { userId, role } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new AppError('Project not found', 404));
    }

    const existingMember = project.members.find(
        member => member.user.toString() === userId
    );

    if (existingMember) {
        return next(
            new AppError('User is already a project member', 409)
        );
    }

    project.members.push({
        user: userId,
        role
    });

    await project.save();

    res.status(200).json({
        success: true,
        message: 'Member added successfully',
        project
    });
});



exports.removeMember = catchAsync(async (req, res, next) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new AppError('Project not found', 404));
    }

    project.members = project.members.filter(
        member => member.user.toString() !== req.params.userId
    );

    await project.save();

    res.status(200).json({
        success: true,
        message: 'Member removed successfully',
        project
    });
});