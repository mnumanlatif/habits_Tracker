import mongoose from 'mongoose';
import debugLib from 'debug';
import config from './config.js';

const debug = debugLib('myapp:db');

// Use native ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  debug(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`);
  process.exit();
});

db.once('open', () => {
  debug('MongoDB connection with database succeeded.');
  console.log('MongoDB Connected');
});

process.on('SIGINT', () => {
  db.close(() => {
    debug('MongoDB connection disconnected through app termination.');
    process.exit();
  });
});

export default db;
