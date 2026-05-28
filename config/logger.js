const winston = require("winston");

const logLevel =
    process.env.NODE_ENV === "development"
        ? "debug"
        : process.env.NODE_ENV === "production"
        ? "warn"
        : "info";

const logger = winston.createLogger({
    level: logLevel,

    transports: [
       
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            )
        }),

        
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

module.exports = logger;