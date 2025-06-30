import winston from 'winston';
import chalk from 'chalk'; 

const { combine, timestamp, printf } = winston.format;

const levelColors = {
  info: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
  debug: chalk.blue,
  default: chalk.white,
};

const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const color = levelColors[level] || levelColors.default;
  const metaData = Object.keys(meta).length ? JSON.stringify(meta) : '';
  return color(`[${timestamp}] ${level.toUpperCase()}: ${message} ${metaData}`);
});


const fileFormat = combine(
  timestamp(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileFormat,
    }),
    new winston.transports.Console({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      ),
    }),
  ],
});

export default logger;