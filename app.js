

import config from './config/config.js';
import db from './config/db.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debugLib from 'debug';

// ESM doesn't support __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const debug = debugLib('myapp:app');

// database config


// view engine setup
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = config.isDev ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

db.on('connected', () => {
  app.listen(config.server.port, config.server.hostname, () => {
    console.log(`www.${config.server.hostname}:${config.server.port}`);
    debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);
    app.emit('appStarted');
  });
});

export default app;
