import config from './config/config.js';
import sequelize from './config/db.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debugLib from 'debug';
import expressWinston from 'express-winston';
import winston from 'winston';

// ESM doesn't support __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const debug = debugLib('myapp:app');

// ✅ Winston Logger instance
const customLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

// ✅ Request logger middleware
app.use(expressWinston.logger({
  winstonInstance: customLogger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));

// 🟡 View engine setup (commented for API-only use)
// app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', 'pug');

app.use(logger(config.isProd ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// bootstrap routes
// import webRoutes from './routes/web.js';
// webRoutes(app);
import apiRoutes from './routes/api.js';
apiRoutes(app);

// ✅ Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ✅ Error logger middleware
app.use(expressWinston.errorLogger({
  winstonInstance: customLogger,
}));

// 🛠️ Error handler (API-safe, JSON response instead of render)
app.use((err, req, res, next) => {
  // 🟡 Previously used for templating (commented out)
  // res.locals.message = err.message;
  // res.locals.error = config.isDev ? err : {};
  // res.status(err.status || 500);
  // res.render('error');

  // ✅ JSON API-safe error response
  console.error('💥 Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(config.isDev && { stack: err.stack }),
  });
});

// ✅ Initialize Sequelize and start the server
try {
  await sequelize.authenticate();
  console.log('✅ Database connected!');

  await sequelize.sync({ alter: true });

  app.listen(config.server.port, () => {
    console.log(`🚀 Server running at http://${config.server.hostname}:${config.server.port}`);
  });
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
  process.exit(1);
}

export default app;
