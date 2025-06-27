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

db.once('open', async () => {
  debug('MongoDB connection with database succeeded.');
  console.log('MongoDB Connected');

  try {
    // 🟡 Fix userId unique index in habits
    const habitsCollection = mongoose.connection.db.collection('habits');
    const habitsIndexes = await habitsCollection.indexes();

    const hasUserIdUnique = habitsIndexes.some(i => i.name === 'userId_1' && i.unique);
    if (hasUserIdUnique) {
      await habitsCollection.dropIndex('userId_1');
      console.log('✅ Dropped unique index on habits.userId');
    }

    const categoriesCollection = mongoose.connection.db.collection('categories');
const categoriesIndexes = await categoriesCollection.indexes();

// 🔥 Drop incorrect name_1 index if it exists
const hasNameIndex = categoriesIndexes.some(i => i.name === 'name_1' && i.unique);
if (hasNameIndex) {
  await categoriesCollection.dropIndex('name_1');
  console.log('✅ Dropped legacy unique index on name_1 (probably categoryName)');
}

const hasCatgoryNameTypo = categoriesIndexes.some(i => i.name === 'catgoryName_1' && i.unique);
if (hasCatgoryNameTypo) {
  await categoriesCollection.dropIndex('catgoryName_1');
  console.log('❌ Dropped bad index on catgoryName (typo)');
}



  } catch (err) {
    console.error('⚠️ Could not check/drop index:', err.message);
  }
});

process.on('SIGINT', () => {
  db.close(() => {
    debug('MongoDB connection disconnected through app termination.');
    process.exit();
  });
});

export default db;
