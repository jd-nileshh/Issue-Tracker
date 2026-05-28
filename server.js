const app = require('./app');
const { PORT,JWT_SECRET } = require('./config/config.js');
const connectDB = require('./config/database.js');
const logger = require('./config/logger');

if (!JWT_SECRET || JWT_SECRET.length < 32) {

    logger.error(
        'JWT_SECRET is missing or shorter than 32 characters'
    );

    process.exit(1);
}

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

    } catch (error) {

        logger.error(`Error starting server: ${error.message}`);

        process.exit(1);
    }
}

startServer();