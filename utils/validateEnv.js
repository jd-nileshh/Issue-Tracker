const logger = require('../config/logger');

function validateEnv() {

    const requiredEnvVars = [
        'MONGODB_URI',
        'JWT_SECRET',
        'PORT'
    ];

    for (const envVar of requiredEnvVars) {

        if (
            !process.env[envVar] ||
            process.env[envVar].trim() === ''
        ) {

            logger.error(
                `${envVar} is missing or empty`
            );

            process.exit(1);
        }
    }

    if (process.env.JWT_SECRET.length < 32) {

        logger.error(
            'JWT_SECRET must be at least 32 characters long'
        );

        process.exit(1);
    }
}

module.exports = validateEnv;