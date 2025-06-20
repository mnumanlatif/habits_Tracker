// config/db.js
import { Sequelize } from 'sequelize';
import debugLib from 'debug';
import config from './config.js';

const debug = debugLib('myapp:db');

const sequelize = new Sequelize({
  dialect: config.database.dialect,
  storage: config.database.storage,
  logging: (msg) => debug(msg),
});

sequelize.authenticate()
  .then(() => {
    debug('Sequelize connection with database succeeded.');
    console.log('Sequelize Connected');
  })
  .catch((err) => {
    debug('Sequelize connection error');
    debug(err.message);
    process.exit();
  });

process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    debug('Sequelize connection disconnected through app termination.');
    process.exit();
  } catch (error) {
    debug('Error closing Sequelize connection:', error);
    process.exit(1);
  }
});

export default sequelize;
