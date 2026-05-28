const Label = require('../models/Label');


const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createLabel = catchAsync(async (req, res, next) => {

    const projectId = req.params.projectId;

    const {
        name,
        color,
        description
    } = req.body;

    const label = await Label.create({
        name,
        color,
        description,
        project: projectId
    });

    res.status(201).json({
        success: true,
        message: 'Label created successfully',
        label
    });
});



exports.getLabels = catchAsync(async (req, res, next) => {

    const labels = await Label.find({
        project: req.params.projectId
    }).lean();

    res.status(200).json({
        success: true,
        labels
    });
});



exports.updateLabel = catchAsync(async (req, res, next) => {

    const label = await Label.findById(req.params.id);

    if (!label) {
        return next(new AppError('Label not found', 404));
    }

    const {
        name,
        color,
        description
    } = req.body;

    if (name !== undefined) {
        label.name = name;
    }

    if (color !== undefined) {
        label.color = color;
    }

    if (description !== undefined) {
        label.description = description;
    }

    await label.save();

    res.status(200).json({
        success: true,
        message: 'Label updated successfully',
        label
    });
});



exports.deleteLabel = catchAsync(async (req, res, next) => {

    const deletedLabel = await Label.findByIdAndDelete(
        req.params.id
    );

    if (!deletedLabel) {
        return next(new AppError('Label not found', 404));
    }

    res.status(204).send();
});