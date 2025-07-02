// app.js
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debugLib from 'debug';
import expressWinston from 'express-winston';
import db, { connectToDB } from './config/db.js';
import config from './config/config.js';
import logger from './app/utils/logger.js';
import { errorMiddleware } from './app/utils/errorHandler.js';
import apiRoutes from './routes/api.js';
import { Response, Request, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const debug = debugLib('myapp:app');

// ✅ Request logging
app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.url}} → {{res.statusCode}} in {{res.responseTime}}ms',
  meta: true,
}));

// ✅ Core middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes); // Base path

// ✅ 404 handler (for unknown routes)
interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

app.use(
  (_err: Error,_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error('Not Found') as CustomError;
  error.statusCode = 404;
  next(error);
});


// ✅ Main error handler (returns JSON)
app.use(
  (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.statusCode || 500;
    res.status(status).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
);


// ✅ Error logging
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));

// ✅ Optional: additional error middleware (if defined in your project)
app.use(errorMiddleware);

// ✅ DB and server start
connectToDB().then(() => {
  const port = Number(config.server.port) || 3000;
  app.listen(port, config.server.hostname, () => {
    console.log(`🌐 Server running at http://${config.server.hostname}:${port}`);
    debug(`App listening on ${config.server.hostname}:${port}`);
    app.emit('appStarted');
  });
});

export default app;
