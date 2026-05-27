const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const{applyPagination} = require('../utils/queryHelper');


exports.getAllUsers = catchAsync(async (req, res, next) => {

    const filter = {};

    if (req.query.search) {
        const regex = new RegExp(
            req.query.search,
            'i'
        );

        filter.$or = [
            { name: regex },
            { email: regex }
        ];
    }

    let query = User.find(filter)
        .select('-password');

    query = applyPagination(
        query,
        req.query
    );

    const users = await query;


    res.status(200).json({
        success: true,
        count: users.length,
        data: users
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