const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.protect = catchAsync(async(req,res,next) => {
    if(
        !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')
    ){
        return next(
            new AppError(
                'Not authenticated , Please Log in.',
                401
            )
        );
    }

    const token = req.headers.authorization.split(' ')[1];

    let decoded;
    try{
        decoded = jwt.verify(
            token,
            config.JWT_SECRET
        );
    }catch(error){
        if(error.name === 'JsonWebTokenError'){
            return next(
                new AppError(
                    'Invalid token',
                    401
                )
            );
        }

        if(error.name === 'TokenExpiredError'){
            return next(
                new AppError(
                    'Your session has expired , Please log in again',
                    401
                )
            );
        }
        return next(error);
    }

    const user = await User.findById(decoded.id)
        .select('-password');

    if(!user){
        return next(
            new AppError(
                'User no longer exists',
                401
            )
        );
    }
    req.user = user;
    next();

});