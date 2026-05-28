const logger = require("../config/logger");

exports.requestLogger = (req, res, next) => {

    logger.info("LOGGER RUNNING");

    req.startTime = Date.now();

    res.on("finish", () => {

        const elapsedTime =
            Date.now() - req.startTime;

        logger.info(
            `Request: ${req.method} ${req.originalUrl} | ` +
            `Status: ${res.statusCode} | ` +
            `Duration: ${elapsedTime}ms | ` +
            `Request ID: ${req.requestId}`
        );
    });

    next();
};