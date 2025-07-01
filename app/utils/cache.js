// utils/cache.js
import redisClient from '../config/redis.js';

export const setCache = async (key, value, ttl = 3600) => {
  if (!key || !value) return;
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttl, // Expire time in seconds
  });
};

export const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key) => {
  await redisClient.del(key);
};
