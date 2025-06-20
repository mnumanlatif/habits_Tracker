// config/config.js
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const isUsingLocalDb = process.env.USE_LOCAL_DB === 'true';

const sqliteStorage = isUsingLocalDb
  ? process.env.SQLITE_LOCAL_PATH || './db/dev.sqlite'
  : process.env.SQLITE_PROD_PATH || './db/prod.sqlite';

const config = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      dialect: 'sqlite',
      storage: sqliteStorage,
    },
  },

  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      dialect: 'sqlite',
      storage: sqliteStorage,
    },
  },
};

config[env].isDev = env === 'development';
config[env].isProd = env === 'production';

console.log('[DEBUG] SQLITE_PATH:', sqliteStorage);

export default config[env];
