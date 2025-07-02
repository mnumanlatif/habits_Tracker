import dotenv from 'dotenv';
dotenv.config();

const isUsingLocalDb = process.env.USE_LOCAL_DB === 'true';

type Env = 'development' | 'production';

interface ConfigSchema {
  server: {
    port: string | number;
    hostname: string;
  };
  database: {
    url?: string;
  };
  isDev?: boolean;
  isProd?: boolean;
}

const env = (process.env.NODE_ENV || 'development') as Env;

const config: Record<Env, ConfigSchema> = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: isUsingLocalDb
        ? process.env.DB_LOCAL_URL
        : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-0.0neqiva.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster-0`,
    },
  },
  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-0.0neqiva.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster-0`,
    },
  },
};

// Now add isDev and isProd with type safety
config[env] = {
  ...config[env],
  isDev: env === 'development',
  isProd: env === 'production',
};

console.log('[DEBUG] USE_LOCAL_DB:', process.env.USE_LOCAL_DB);
console.log('[DEBUG] DB_LOCAL_URL:', process.env.DB_LOCAL_URL);
console.log('[DEBUG]PORT:',process.env.PORT);
console.log('[DEBUG]LOCAL_HOST:',process.env.HOSTNAME)
export default config[env];
