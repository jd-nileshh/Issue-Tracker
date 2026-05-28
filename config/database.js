const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const logger = require('./logger');

async function connectDB() {

    try {

        await mongoose.connect(MONGODB_URI);

        logger.info(
            `MongoDB connected to ${mongoose.connection.host}`
        );

    } catch (error) {

        logger.error(
            `Database connection failed: ${error.message}`
        );

        process.exit(1);
    }
}

module.exports = connectDB;