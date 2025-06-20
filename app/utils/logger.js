// utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log to console (for development)
    new winston.transports.Console(),

    // Log to file (for persistence)
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
});

export default logger;
