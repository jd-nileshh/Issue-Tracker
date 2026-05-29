require('dotenv').config();

const validateEnv = require('./utils/validateEnv');

validateEnv();
const app = require('./app');
const { PORT } = require('./config/config.js');
const connectDB = require('./config/database.js');
const logger = require('./config/logger');
const mongoose = require('mongoose');



let server;
async function startServer() {
    try {
        await connectDB();

        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

    } catch (error) {

        logger.error(`Error starting server: ${error.message}`);

        process.exit(1);
    }
}

startServer();

async function gracefulShutdown(signal) {

    logger.info(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {

        try {

            await mongoose.connection.close();

            logger.info(
                'MongoDB connection closed. Server shutdown complete.'
            );

            process.exit(0);

        } catch (error) {

            logger.error(
                `Error during shutdown: ${error.message}`
            );

            process.exit(1);
        }
    });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('SIGINT', () => gracefulShutdown('SIGINT'));