// app.js
import config from './config/config.js';
import db from './config/db.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debugLib from 'debug';
import expressWinston from 'express-winston';
import logger from './app/helpers/utils/logger.js';
import { errorMiddleware } from './app/helpers/utils/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const debug = debugLib('myapp:app');

// ✅ Request logging
app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: "HTTP {{req.method}} {{req.url}} → {{res.statusCode}} in {{res.responseTime}}ms",
  meta: true,
}));

// ✅ Core middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
import apiRoutes from './routes/api.js';
apiRoutes(app);

// ✅ 404 handler (for unknown routes)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

// ✅ Main error handler (returns JSON)
app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // ...(config.isDev && { stack: err.stack })
  });
});

// ✅ Error logging
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));

// ✅ Optional: additional error middleware (if defined in your project)
app.use(errorMiddleware);

// ✅ DB and server start
db.on('connected', () => {
  app.listen(config.server.port, config.server.hostname, () => {
    console.log(`🌐 Server running at http://${config.server.hostname}:${config.server.port}`);
    debug(`App listening on ${config.server.hostname}:${config.server.port}`);
    app.emit('appStarted');
  });
});

export default app;
