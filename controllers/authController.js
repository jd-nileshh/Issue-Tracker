const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.register = catchAsync(async (req, res, next) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(new AppError('Email is already registered', 409));
    }

    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});


exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new AppError('Invalid credentials', 401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new AppError('Invalid credentials', 401));
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        token: 'Token will be added in later stage',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});


exports.getMe = catchAsync(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: 'Authentication will be added in stage 15'
    });
});


exports.logout = catchAsync(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
});