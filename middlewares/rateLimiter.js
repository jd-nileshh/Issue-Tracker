const rateLimit = require('express-rate-limit');

// General API limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later'
});

// Strict auth limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many login attempts, please wait before trying again'
});

module.exports = {
    generalLimiter,
    authLimiter
};