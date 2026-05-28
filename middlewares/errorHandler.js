const AppError = require('../utils/AppError');
const logger = require('../config/logger');

exports.errorHandler = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message;

    error.statusCode = err.statusCode || 500;

    // Log every error
    logger.error(
        `Method: ${req.method} | ` +
        `URL: ${req.originalUrl} | ` +
        `Request ID: ${req.requestId} | ` +
        `Error: ${err.stack}`
    );

    if (err.name === 'CastError') {

        error = new AppError(
            'Resource not found',
            400
        );
    }

    if (err.code === 11000) {

        error = new AppError(
            'Duplicate field found',
            409
        );
    }

    if (err.name === 'ValidationError') {

        const messages = Object.values(err.errors)
            .map(val => val.message);

        error = new AppError(
            messages.join(', '),
            422
        );
    }

    res.status(error.statusCode).json({
        success: false,
        status: error.status,
        message: error.message,

        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack
        })
    });
};