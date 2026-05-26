const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find().select('-password');

    res.status(200).json({
        success: true,
        users
    });
});



exports.getUserById = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id)
        .select('-password');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});



exports.updateUser = catchAsync(async (req, res, next) => {

    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, avatar },
        {
            new: true,
            runValidators: true
        }
    ).select('-password');

    if (!updatedUser) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: updatedUser
    });
});



exports.deleteUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(204).send();
});