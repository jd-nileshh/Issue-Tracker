exports.requestLogger = (req, res, next) => {

    console.log('LOGGER RUNNING');

    req.startTime = Date.now();

    res.on('finish', () => {

        const elapsedTime =
            Date.now() - req.startTime;

        console.log(
            'Request:',
            req.method,
            req.originalUrl,
            '| Status:',
            res.statusCode,
            '| Duration:',
            `${elapsedTime}ms`,
            '| Request ID:',
            req.requestId
        );
    });

    next();
};